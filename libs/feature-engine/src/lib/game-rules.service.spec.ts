/* eslint-disable no-magic-numbers */
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  DiscardPileCardsFacade,
  DomainsCardsFacade,
  EventsPileCardsFacade,
  FaceUpPilesCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import {
  ID_DOMAIN_RED,
  ID_FACE_UP_HAMLET,
  ID_FACE_UP_ROAD,
  ID_FACE_UP_TOWN,
  ID_HAND_BLUE,
  ID_HAND_RED,
} from '@taormina/shared-constants';
import {
  ActionName,
  ACTION_CARD_INTERFACE_NAME,
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  EventValue,
  GamePhase,
  LAND_CARD_INTERFACE_NAME,
  MasteryPointsType,
} from '@taormina/shared-models';
import { of } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { tap } from 'rxjs/operators';

import { GameRulesService } from './game-rules.service';

describe('GameRulesService', () => {
  let service: GameRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        GameFacade,
        DomainsCardsFacade,
        HandsCardsFacade,
        FaceUpPilesCardsFacade,
        LandsPileCardsFacade,
        StockPilesCardsFacade,
        EventsPileCardsFacade,
        DiscardPileCardsFacade,
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', inject(
    [GameRulesService],
    (injectedService: GameRulesService) => {
      expect(injectedService).toBeTruthy();
    }
  ));

  describe('eventDie$', () => {
    describe('event$', () => {
      it(
        'should filter events other than event',
        marbles((m) => {
          // Given a stream of events
          const eventDie$ = m.hot('^-a-b-c-|', {
            a: EventValue.Event,
            b: EventValue.Thieves,
            c: EventValue.Trade,
          });
          // When the event$ stream is build on it
          const gameFacadeMock = {
            eventDie$,
            productionDie$: of(),
          };
          TestBed.configureTestingModule({
            providers: [{ provide: GameFacade, useValue: gameFacadeMock }],
          });
          service = TestBed.inject(GameRulesService);
          // Then only event events should remain
          const expected$ = m.cold('--a-----|', {
            a: EventValue.Event,
          });
          m.expect(service.event$).toBeObservable(expected$);
        })
      );
    });

    describe('thieves$', () => {
      it(
        'should filter events other than thieves',
        marbles((m) => {
          // Given a stream of events
          const eventDie$ = m.hot('^-a-b-c-|', {
            a: EventValue.Event,
            b: EventValue.Thieves,
            c: EventValue.Trade,
          });
          // When the thieves$ stream is build on it
          const gameFacadeMock = {
            eventDie$,
            productionDie$: of(),
          };
          TestBed.configureTestingModule({
            providers: [{ provide: GameFacade, useValue: gameFacadeMock }],
          });
          service = TestBed.inject(GameRulesService);
          // Then only thieves events should remain
          const expected$ = m.cold('----a---|', {
            a: EventValue.Thieves,
          });
          m.expect(service.thieves$).toBeObservable(expected$);
        })
      );
    });
  });

  describe('countAndSteal$', () => {
    it(
      `should call countAndStealUnprotectedGoldAndWool
       on thieves and complete on gameEnded`,
      marbles((m) => {
        // Given a stream of thieves events
        const eventDie$ = m.hot('^-a-a-|', {
          a: EventValue.Thieves,
        });
        // Given a countAndSteal$ stream build on it
        const gameFacadeMock = {
          eventDie$,
          productionDie$: of(),
        };
        const domainsCardsFacadeMock = {
          countAndStealUnprotectedGoldAndWool: jest.fn(),
        };
        TestBed.configureTestingModule({
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
        // When the gameEnded$ subject emits
        m.cold('---a-|').subscribe(() => service.gameEnded$.next());
        // Then the countAndSteal$ stream completes
        const expected$ = m.cold('--a|', { a: undefined });
        m.expect(service.countAndSteal$).toBeObservable(expected$);
        // Then call countAndStealUnprotectedGoldAndWool on thieves before completion
        service.countAndSteal$.pipe(
          tap(() => {
            expect(
              domainsCardsFacadeMock.countAndStealUnprotectedGoldAndWool
            ).toHaveBeenCalledTimes(1);
          })
        );
      })
    );
  });

  describe('selectFirstEvent$', () => {
    it(
      `should call selectFirst on event and complete on gameEnded`,
      marbles((m) => {
        // Given a stream of event events
        const eventDie$ = m.hot('^-a-a-|', {
          a: EventValue.Event,
        });
        // Given a selectFirstEvent$ stream build on it
        const gameFacadeMock = {
          eventDie$,
          productionDie$: of(),
        };
        const eventsPileCardsFacadeMock = {
          selectedEventsPileCards$: of(),
          selectFirst: jest.fn(),
        };
        TestBed.configureTestingModule({
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            {
              provide: EventsPileCardsFacade,
              useValue: eventsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
        // When the gameEnded$ subject emits
        m.cold('---a-|').subscribe(() => service.gameEnded$.next());
        // Then the selectFirstEvent$ stream completes
        const expected$ = m.cold('--a|', { a: undefined });
        m.expect(service.selectFirstEvent$).toBeObservable(expected$);
        // Then call selectFirst on event before completion
        service.selectFirstEvent$.pipe(
          tap(() => {
            expect(eventsPileCardsFacadeMock.selectFirst).toHaveBeenCalledTimes(
              1
            );
          })
        );
      })
    );
  });

  describe('auspiciousYear$', () => {
    it(
      'should filter selected events pile cards other than auspicious year',
      marbles((m) => {
        // Given a stream of selected events pile cards
        const selectedEventsPileCards$ = m.hot('^-a-b-c-|', {
          a: undefined,
          b: { id: 'aaaa', cardId: 'EVENT_1' },
          c: { id: 'bbbb', cardId: 'EVENT_0' },
        });
        // When the auspiciousYear$ stream is build on it
        const eventsPileCardsFacadeMock = {
          selectedEventsPileCards$,
        };
        TestBed.configureTestingModule({
          providers: [
            {
              provide: EventsPileCardsFacade,
              useValue: eventsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
        // Then only auspicious year events should remain
        const expected$ = m.cold('----a---|', {
          a: { id: 'aaaa', cardId: 'EVENT_1' },
        });
        m.expect(service.auspiciousYear$).toBeObservable(expected$);
      })
    );
  });

  describe('festival$', () => {
    it(
      'should filter selected events pile cards other than festival',
      marbles((m) => {
        // Given a stream of selected events pile cards
        const selectedEventsPileCards$ = m.hot('^-a-b-c-|', {
          a: undefined,
          b: { id: 'aaaa', cardId: 'EVENT_1' },
          c: { id: 'bbbb', cardId: 'EVENT_0' },
        });
        // When the festival$ stream is build on it
        const eventsPileCardsFacadeMock = {
          selectedEventsPileCards$,
        };
        TestBed.configureTestingModule({
          providers: [
            {
              provide: EventsPileCardsFacade,
              useValue: eventsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
        // Then only festival events should remain
        const expected$ = m.cold('------a-|', {
          a: { id: 'bbbb', cardId: 'EVENT_0' },
        });
        m.expect(service.festival$).toBeObservable(expected$);
      })
    );
  });

  describe('increaseResourcesForDie$', () => {
    it(
      'should complete on gameEnded',
      marbles((m) => {
        // Given a stream of productions and an increaseResourcesForDie$ stream build on it
        const productionDie$ = m.hot('^-a-b-|', {
          a: 5,
          b: 3,
        });
        const gameFacadeMock = {
          eventDie$: of(),
          productionDie$,
        };
        TestBed.configureTestingModule({
          providers: [{ provide: GameFacade, useValue: gameFacadeMock }],
        });
        service = TestBed.inject(GameRulesService);
        // When the gameEnded$ subject emits
        m.cold('---a-|').subscribe(() => service.gameEnded$.next());
        // Then the increaseResourcesForDie$ stream completes
        const expected$ = m.cold('--a|', { a: undefined });
        m.expect(service.increaseResourcesForDie$).toBeObservable(expected$);
      })
    );
  });

  describe('increaseResourcesForAuspiciousYear$', () => {
    it(
      `should call increaseResourcesForAuspiciousYear on auspicious year event
       and complete on gameEnded`,
      marbles((m) => {
        // Given a stream of auspicious year events
        const selectedEventsPileCards$ = m.hot('^-a-b-|', {
          a: { id: 'aaaa', cardId: 'EVENT_1' },
          b: { id: 'bbbb', cardId: 'EVENT_2' },
        });
        // Given a increaseResourcesForAuspiciousYear$ stream build on it
        const domainsCardsFacadeMock = {
          increaseResourcesForAuspiciousYear: jest.fn(),
        };
        const eventsPileCardsFacadeMock = {
          selectedEventsPileCards$,
        };
        TestBed.configureTestingModule({
          providers: [
            {
              provide: DomainsCardsFacade,
              useValue: domainsCardsFacadeMock,
            },
            {
              provide: EventsPileCardsFacade,
              useValue: eventsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
        // When the gameEnded$ subject emits
        m.cold('---a-|').subscribe(() => service.gameEnded$.next());
        // Then the increaseResourcesForAuspiciousYear$ stream completes
        const expected$ = m.cold('--a|', { a: undefined });
        m.expect(service.increaseResourcesForAuspiciousYear$).toBeObservable(
          expected$
        );
        // Then call increaseResourcesForAuspiciousYear on event before completion
        service.increaseResourcesForAuspiciousYear$.pipe(
          tap(() => {
            expect(
              domainsCardsFacadeMock.increaseResourcesForAuspiciousYear
            ).toHaveBeenCalledTimes(1);
          })
        );
      })
    );
  });

  describe('resetEventsPileOnFestival$', () => {
    it(
      `should call resetEventsPileOnFestival on festival event
       and complete on gameEnded`,
      marbles((m) => {
        // Given a stream of festival events
        const selectedEventsPileCards$ = m.hot('^-a-b-|', {
          a: { id: 'aaaa', cardId: 'EVENT_0' },
          b: { id: 'bbbb', cardId: 'EVENT_0' },
        });
        // Given a resetEventsPileOnFestival$ stream build on it
        const eventsPileCardsFacadeMock = {
          selectedEventsPileCards$,
          resetEventsPile: jest.fn(),
        };
        TestBed.configureTestingModule({
          providers: [
            {
              provide: EventsPileCardsFacade,
              useValue: eventsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
        // When the gameEnded$ subject emits
        m.cold('---a-|').subscribe(() => service.gameEnded$.next());
        // Then the resetEventsPileOnFestival$ stream completes
        const expected$ = m.cold('--a|', { a: undefined });
        m.expect(service.resetEventsPileOnFestival$).toBeObservable(expected$);
        // Then call resetEventsPile on event before completion
        service.increaseResourcesForAuspiciousYear$.pipe(
          tap(() => {
            expect(
              eventsPileCardsFacadeMock.resetEventsPile
            ).toHaveBeenCalledTimes(1);
          })
        );
      })
    );
  });

  describe('initNewGame', () => {
    const gameFacadeMock = {
      eventDie$: of(),
      productionDie$: of(),
      initNewGame: jest.fn(),
    };
    const domainsCardsFacadeMock = {
      initNewGame: jest.fn(),
    };
    const handsCardsFacadeMock = {
      initNewGame: jest.fn(),
    };
    const faceUpPilesCardsFacadeMock = {
      initNewGame: jest.fn(),
    };
    const landsPileCardsFacadeMock = {
      initNewGame: jest.fn(),
    };
    const stockPilesCardsFacadeMock = {
      initNewGame: jest.fn(),
    };
    const eventsPileCardsFacadeMock = {
      selectedEventsPileCards$: of(),
      initNewGame: jest.fn(),
    };
    const discardPileCardsFacadeMock = {
      initNewGame: jest.fn(),
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: GameFacade, useValue: gameFacadeMock },
          { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
          {
            provide: FaceUpPilesCardsFacade,
            useValue: faceUpPilesCardsFacadeMock,
          },
          { provide: LandsPileCardsFacade, useValue: landsPileCardsFacadeMock },
          {
            provide: StockPilesCardsFacade,
            useValue: stockPilesCardsFacadeMock,
          },
          {
            provide: EventsPileCardsFacade,
            useValue: eventsPileCardsFacadeMock,
          },
          {
            provide: DiscardPileCardsFacade,
            useValue: discardPileCardsFacadeMock,
          },
        ],
      });
      service = TestBed.inject(GameRulesService);
    });

    it('should call all the facades initNewGame functions', () => {
      const gameEndedNextSpy = jest.spyOn(service.gameEnded$, 'next');
      const countAndStealSubscribeSpy = jest.spyOn(
        service.countAndSteal$,
        'subscribe'
      );
      const selectFirstEventSubscribeSpy = jest.spyOn(
        service.selectFirstEvent$,
        'subscribe'
      );
      const increaseResourcesForDieSubscribeSpy = jest.spyOn(
        service.increaseResourcesForDie$,
        'subscribe'
      );
      const increaseResourcesForAuspiciousYearSubscribeSpy = jest.spyOn(
        service.increaseResourcesForAuspiciousYear$,
        'subscribe'
      );
      const resetEventsPileOnFestivalSubscribeSpy = jest.spyOn(
        service.resetEventsPileOnFestival$,
        'subscribe'
      );

      service.initNewGame();

      expect(gameEndedNextSpy).toHaveBeenCalledTimes(1);
      expect(countAndStealSubscribeSpy).toHaveBeenCalledTimes(1);
      expect(selectFirstEventSubscribeSpy).toHaveBeenCalledTimes(1);
      expect(increaseResourcesForDieSubscribeSpy).toHaveBeenCalledTimes(1);
      expect(
        increaseResourcesForAuspiciousYearSubscribeSpy
      ).toHaveBeenCalledTimes(1);
      expect(resetEventsPileOnFestivalSubscribeSpy).toHaveBeenCalledTimes(1);

      expect(gameFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(domainsCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(handsCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(faceUpPilesCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(landsPileCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(stockPilesCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(eventsPileCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(discardPileCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
    });
  });

  describe('drawFromStockToHand', () => {
    const handsCardsFacadeMock = {
      addCardsToHand: jest.fn(),
    };
    const stockPilesCardsFacadeMock = {
      allStockPilesCards$: of([
        {
          id: 'aaaa',
          pileId: 'STOCK_1',
          cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
          cardId: 'BUILDING_1',
        },
        {
          id: 'bbbb',
          pileId: 'STOCK_1',
          cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
          cardId: 'BUILDING_2',
        },
        {
          id: 'cccc',
          pileId: 'STOCK_1',
          cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
          cardId: 'BUILDING_3',
        },
      ]),
      removeCardsFromStockPileTop: jest.fn(),
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({})],
        providers: [
          { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
          {
            provide: StockPilesCardsFacade,
            useValue: stockPilesCardsFacadeMock,
          },
        ],
      });
      service = TestBed.inject(GameRulesService);
    });

    it('should call removeCardsFromStockPileTop, then addCardsToHand', () => {
      service.drawFromStockToHand('STOCK_1', 3, ID_HAND_RED);

      const cards = [
        {
          type: DEVELOPMENT_CARD_INTERFACE_NAME,
          id: 'BUILDING_1',
        },
        {
          type: DEVELOPMENT_CARD_INTERFACE_NAME,
          id: 'BUILDING_2',
        },
        {
          type: DEVELOPMENT_CARD_INTERFACE_NAME,
          id: 'BUILDING_3',
        },
      ];

      expect(
        stockPilesCardsFacadeMock.removeCardsFromStockPileTop
      ).toHaveBeenCalledWith('STOCK_1', cards);
      expect(handsCardsFacadeMock.addCardsToHand).toHaveBeenCalledWith(
        ID_HAND_RED,
        cards
      );
    });
  });

  describe('throwDice', () => {
    describe('initial throw', () => {
      const gameFacadeMock = {
        eventDie$: of(EventValue.Event),
        productionDie$: of(),
        phase$: of(GamePhase.InitialThrow),
        throwEventDie: jest.fn(),
        throwProductionDie: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [{ provide: GameFacade, useValue: gameFacadeMock }],
        });
        service = TestBed.inject(GameRulesService);
      });

      it('should call throwEventDie only', () => {
        service.throwDice();

        expect(gameFacadeMock.throwEventDie).toHaveBeenCalledTimes(1);
        expect(gameFacadeMock.throwProductionDie).not.toHaveBeenCalled();
      });
    });

    describe('thieves event', () => {
      const gameFacadeMock = {
        eventDie$: of(EventValue.Thieves),
        productionDie$: of(),
        phase$: of(GamePhase.LoopThrow),
        throwEventDie: jest.fn(),
        throwProductionDie: jest.fn(),
      };
      const domainsCardsFacadeMock = {
        countAndStealUnprotectedGoldAndWool: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call throwEventDie, throwProductionDie
          and countAndStealUnprotectedGoldAndWool`, () => {
        // TODO: test actions order: event > steal on thieves > production
        service.throwDice();

        expect(gameFacadeMock.throwEventDie).toHaveBeenCalledTimes(1);
        expect(gameFacadeMock.throwProductionDie).toHaveBeenCalledTimes(1);

        service.countAndSteal$.pipe(
          tap(() => {
            expect(
              domainsCardsFacadeMock.countAndStealUnprotectedGoldAndWool
            ).toHaveBeenCalledTimes(1);
          })
        );
      });
    });

    describe('other event', () => {
      const gameFacadeMock = {
        eventDie$: of(EventValue.Event),
        productionDie$: of(),
        phase$: of(GamePhase.LoopThrow),
        throwEventDie: jest.fn(),
        throwProductionDie: jest.fn(),
      };
      const domainsCardsFacadeMock = {
        countAndStealUnprotectedGoldAndWool: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it('should call throwEventDie and throwProductionDie', () => {
        service.throwDice();

        expect(gameFacadeMock.throwEventDie).toHaveBeenCalledTimes(1);
        expect(gameFacadeMock.throwProductionDie).toHaveBeenCalledTimes(1);

        service.countAndSteal$.pipe(
          tap(() => {
            expect(
              domainsCardsFacadeMock.countAndStealUnprotectedGoldAndWool
            ).not.toHaveBeenCalled();
          })
        );
      });
    });
  });

  describe('useResourcesToPutFaceUpPileCardInSlot', () => {
    describe('OK road', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_AGGLOMERATION_SLOT,
            cardId: undefined,
            col: 2,
            row: 0,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of({
          id: 'aaaa',
          pileId: ID_FACE_UP_ROAD,
          cardId: 'ROAD_1',
        }),
        removeFaceUpPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: FaceUpPilesCardsFacade,
              useValue: faceUpPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call useLockedResources, removeFaceUpPileCard,
          putCardInSlot, createAvailableDomainCard, clearDomainCardSelection`, () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
        expect(
          faceUpPilesCardsFacadeMock.removeFaceUpPileCard
        ).toHaveBeenCalledWith('aaaa');
        expect(domainsCardsFacadeMock.putCardInSlot).toHaveBeenCalledWith(
          'aaaa',
          AGGLOMERATION_CARD_INTERFACE_NAME,
          'ROAD_1'
        );
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).toHaveBeenCalledWith(
          ID_DOMAIN_RED,
          AVAILABLE_AGGLOMERATION_SLOT,
          3,
          0
        );
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('OK hamlet', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_AGGLOMERATION_SLOT,
            cardId: undefined,
            col: -3,
            row: 0,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of({
          id: 'aaaa',
          pileId: ID_FACE_UP_HAMLET,
          cardId: 'HAMLET_1',
        }),
        removeFaceUpPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: FaceUpPilesCardsFacade,
              useValue: faceUpPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call useLockedResources, removeFaceUpPileCard,
          putCardInSlot, createAvailableDomainCard x3, clearDomainCardSelection`, () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
        expect(
          faceUpPilesCardsFacadeMock.removeFaceUpPileCard
        ).toHaveBeenCalledWith('aaaa');
        expect(domainsCardsFacadeMock.putCardInSlot).toHaveBeenCalledWith(
          'aaaa',
          AGGLOMERATION_CARD_INTERFACE_NAME,
          'HAMLET_1'
        );
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).toHaveBeenNthCalledWith(
          1,
          ID_DOMAIN_RED,
          AVAILABLE_AGGLOMERATION_SLOT,
          -4,
          0
        );
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).toHaveBeenNthCalledWith(
          2,
          ID_DOMAIN_RED,
          AVAILABLE_LAND_SLOT,
          -4,
          -1
        );
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).toHaveBeenNthCalledWith(3, ID_DOMAIN_RED, AVAILABLE_LAND_SLOT, -4, 1);
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('OK town', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'aaaa',
            col: -1,
            row: 0,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of({
          id: 'aaaa',
          pileId: ID_FACE_UP_TOWN,
          cardId: 'TOWN_1',
        }),
        removeFaceUpPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: FaceUpPilesCardsFacade,
              useValue: faceUpPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call useLockedResources, removeFaceUpPileCard,
          putCardInSlot, createAvailableDomainCard x2, clearDomainCardSelection`, () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
        expect(
          faceUpPilesCardsFacadeMock.removeFaceUpPileCard
        ).toHaveBeenCalledWith('aaaa');
        expect(domainsCardsFacadeMock.putCardInSlot).toHaveBeenCalledWith(
          'aaaa',
          AGGLOMERATION_CARD_INTERFACE_NAME,
          'TOWN_1'
        );
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).toHaveBeenNthCalledWith(
          1,
          ID_DOMAIN_RED,
          AVAILABLE_DEVELOPMENT_SLOT,
          -1,
          -2
        );
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).toHaveBeenNthCalledWith(
          2,
          ID_DOMAIN_RED,
          AVAILABLE_DEVELOPMENT_SLOT,
          -1,
          2
        );
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('NOK undefined selectedFaceUpPilesCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_AGGLOMERATION_SLOT,
            cardId: undefined,
            col: -2,
            row: 0,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of(undefined),
        removeFaceUpPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: FaceUpPilesCardsFacade,
              useValue: faceUpPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should call useLockedResources then throw', () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );

        expect(
          faceUpPilesCardsFacadeMock.removeFaceUpPileCard
        ).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK empty selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([]),
        clearDomainCardSelection: jest.fn(),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of({
          id: 'aaaa',
          pileId: ID_FACE_UP_ROAD,
          cardId: 'ROAD_1',
        }),
        removeFaceUpPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: FaceUpPilesCardsFacade,
              useValue: faceUpPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should call useLockedResources then throw', () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );

        expect(
          faceUpPilesCardsFacadeMock.removeFaceUpPileCard
        ).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK more than one selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_AGGLOMERATION_SLOT,
            cardId: undefined,
            col: -2,
            row: 0,
          },
          {
            id: 'bbbb',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_AGGLOMERATION_SLOT,
            cardId: undefined,
            col: 2,
            row: 0,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of({
          id: 'aaaa',
          pileId: ID_FACE_UP_ROAD,
          cardId: 'ROAD_1',
        }),
        removeFaceUpPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: FaceUpPilesCardsFacade,
              useValue: faceUpPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should call useLockedResources then throw', () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );

        expect(
          faceUpPilesCardsFacadeMock.removeFaceUpPileCard
        ).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.createAvailableDomainCard
        ).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('useResourcesToPutHandCardInSlot', () => {
    describe('OK', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_DEVELOPMENT_SLOT,
            cardId: undefined,
            col: -1,
            row: -1,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_DOMAIN_RED,
          cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
          cardId: 'SHIP_1',
        }),
        removeHandCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: HandsCardsFacade,
              useValue: handsCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call useLockedResources, removeHandCard,
          putCardInSlot, clearDomainCardSelection`, () => {
        service.useResourcesToPutHandCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
        expect(handsCardsFacadeMock.removeHandCard).toHaveBeenCalledWith(
          'aaaa'
        );
        expect(domainsCardsFacadeMock.putCardInSlot).toHaveBeenCalledWith(
          'aaaa',
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'SHIP_1'
        );
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('NOK undefined selectedHandsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_DEVELOPMENT_SLOT,
            cardId: undefined,
            col: -1,
            row: -1,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of(undefined),
        removeHandCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: HandsCardsFacade,
              useValue: handsCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should call useLockedResources then throw', () => {
        service.useResourcesToPutHandCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK empty selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([]),
        clearDomainCardSelection: jest.fn(),
        putCardInSlot: jest.fn(),
        useLockedResources: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_DOMAIN_RED,
          cardId: 'SHIP_1',
        }),
        removeHandCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: HandsCardsFacade,
              useValue: handsCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should call useLockedResources then throw', () => {
        service.useResourcesToPutHandCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('putLandsPileCardInSlot', () => {
    describe('OK', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_LAND_SLOT,
            cardId: undefined,
            col: -4,
            row: -1,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        putCardInSlot: jest.fn(),
      };
      const landsPileCardsFacadeMock = {
        selectedLandsPileCards$: of({
          id: 'aaaa',
          cardId: 'LAND_1',
        }),
        removeLandsPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: LandsPileCardsFacade,
              useValue: landsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call removeLandsPileCard,
          putCardInSlot, clearDomainCardSelection`, () => {
        service.putLandsPileCardInSlot();

        expect(
          landsPileCardsFacadeMock.removeLandsPileCard
        ).toHaveBeenCalledWith('aaaa');
        expect(domainsCardsFacadeMock.putCardInSlot).toHaveBeenCalledWith(
          'aaaa',
          LAND_CARD_INTERFACE_NAME,
          'LAND_1'
        );
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).toHaveBeenCalledTimes(1);
      });
    });

    describe('NOK undefined selectedLandsPileCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([
          {
            id: 'aaaa',
            domainId: ID_DOMAIN_RED,
            cartType: AVAILABLE_LAND_SLOT,
            cardId: undefined,
            col: -4,
            row: -1,
          },
        ]),
        clearDomainCardSelection: jest.fn(),
        putCardInSlot: jest.fn(),
      };
      const landsPileCardsFacadeMock = {
        selectedLandsPileCards$: of(undefined),
        removeLandsPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: LandsPileCardsFacade,
              useValue: landsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.putLandsPileCardInSlot();

        expect(
          landsPileCardsFacadeMock.removeLandsPileCard
        ).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK empty selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of([]),
        clearDomainCardSelection: jest.fn(),
        putCardInSlot: jest.fn(),
      };
      const landsPileCardsFacadeMock = {
        selectedLandsPileCards$: of({
          id: 'aaaa',
          cardId: 'LAND_1',
        }),
        removeLandsPileCard: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
            {
              provide: LandsPileCardsFacade,
              useValue: landsPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.putLandsPileCardInSlot();

        expect(
          landsPileCardsFacadeMock.removeLandsPileCard
        ).not.toHaveBeenCalled();
        expect(domainsCardsFacadeMock.putCardInSlot).not.toHaveBeenCalled();
        expect(
          domainsCardsFacadeMock.clearDomainCardSelection
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('putBackFromHandToStockPile', () => {
    describe('OK', () => {
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_HAND_BLUE,
          cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
          cardId: 'BUILDING_1',
        }),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const stockPilesCardsFacadeMock = {
        addCardsToStockPileBottom: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: StockPilesCardsFacade,
              useValue: stockPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call removeHandCard and unselectHandCard,
          then addCardsToStockPileBottom`, () => {
        service.putBackFromHandToStockPile('STOCK_1');

        expect(handsCardsFacadeMock.removeHandCard).toHaveBeenCalledWith(
          'aaaa'
        );
        expect(handsCardsFacadeMock.unselectHandCard).toHaveBeenCalledTimes(1);
        expect(
          stockPilesCardsFacadeMock.addCardsToStockPileBottom
        ).toHaveBeenCalledWith('STOCK_1', [
          {
            type: DEVELOPMENT_CARD_INTERFACE_NAME,
            id: 'BUILDING_1',
          },
        ]);
      });
    });

    describe('NOK undefined selectedHandsCards', () => {
      const handsCardsFacadeMock = {
        selectedHandsCards$: of(undefined),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const stockPilesCardsFacadeMock = {
        addCardsToStockPileBottom: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: StockPilesCardsFacade,
              useValue: stockPilesCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.putBackFromHandToStockPile('STOCK_1');

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(handsCardsFacadeMock.unselectHandCard).not.toHaveBeenCalled();
        expect(
          stockPilesCardsFacadeMock.addCardsToStockPileBottom
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('useActionCard', () => {
    describe('OK', () => {
      const gameFacadeMock = {
        eventDie$: of(),
        productionDie$: of(),
        setAction: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_HAND_BLUE,
          cardType: ACTION_CARD_INTERFACE_NAME,
          cardId: 'ACTION_1',
        }),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const discardPileCardsFacadeMock = {
        addCardToDiscardPile: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: DiscardPileCardsFacade,
              useValue: discardPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should call removeHandCard and unselectHandCard,
          then setAction and addCardToDiscardPile`, () => {
        service.useActionCard();

        expect(handsCardsFacadeMock.removeHandCard).toHaveBeenCalledWith(
          'aaaa'
        );
        expect(handsCardsFacadeMock.unselectHandCard).toHaveBeenCalledTimes(1);
        expect(gameFacadeMock.setAction).toHaveBeenCalledWith(
          ActionName.Soothsayer
        );
        expect(
          discardPileCardsFacadeMock.addCardToDiscardPile
        ).toHaveBeenCalledWith({
          type: ACTION_CARD_INTERFACE_NAME,
          id: 'ACTION_1',
        });
      });
    });

    describe('NOK undefined selectedHandsCards', () => {
      const gameFacadeMock = {
        eventDie$: of(),
        productionDie$: of(),
        setAction: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of(undefined),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const discardPileCardsFacadeMock = {
        addCardToDiscardPile: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: DiscardPileCardsFacade,
              useValue: discardPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.useActionCard();

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(handsCardsFacadeMock.unselectHandCard).not.toHaveBeenCalled();
        expect(gameFacadeMock.setAction).not.toHaveBeenCalled();
        expect(
          discardPileCardsFacadeMock.addCardToDiscardPile
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK cardType', () => {
      const gameFacadeMock = {
        eventDie$: of(),
        productionDie$: of(),
        setAction: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_HAND_BLUE,
          cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
          cardId: 'ACTION_1',
        }),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const discardPileCardsFacadeMock = {
        addCardToDiscardPile: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: DiscardPileCardsFacade,
              useValue: discardPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.useActionCard();

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(handsCardsFacadeMock.unselectHandCard).not.toHaveBeenCalled();
        expect(gameFacadeMock.setAction).not.toHaveBeenCalled();
        expect(
          discardPileCardsFacadeMock.addCardToDiscardPile
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK cardId', () => {
      const gameFacadeMock = {
        eventDie$: of(),
        productionDie$: of(),
        setAction: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_HAND_BLUE,
          cardType: ACTION_CARD_INTERFACE_NAME,
          cardId: undefined,
        }),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const discardPileCardsFacadeMock = {
        addCardToDiscardPile: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: DiscardPileCardsFacade,
              useValue: discardPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.useActionCard();

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(handsCardsFacadeMock.unselectHandCard).not.toHaveBeenCalled();
        expect(gameFacadeMock.setAction).not.toHaveBeenCalled();
        expect(
          discardPileCardsFacadeMock.addCardToDiscardPile
        ).not.toHaveBeenCalled();
      });
    });

    describe('NOK actionCards get undefined', () => {
      const gameFacadeMock = {
        eventDie$: of(),
        productionDie$: of(),
        setAction: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_HAND_BLUE,
          cardType: ACTION_CARD_INTERFACE_NAME,
          cardId: 'ACTION_10',
        }),
        removeHandCard: jest.fn(),
        unselectHandCard: jest.fn(),
      };
      const discardPileCardsFacadeMock = {
        addCardToDiscardPile: jest.fn(),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: GameFacade, useValue: gameFacadeMock },
            { provide: HandsCardsFacade, useValue: handsCardsFacadeMock },
            {
              provide: DiscardPileCardsFacade,
              useValue: discardPileCardsFacadeMock,
            },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      // FIXME: should test error thrown
      it('should not call', () => {
        service.useActionCard();

        expect(handsCardsFacadeMock.removeHandCard).not.toHaveBeenCalled();
        expect(handsCardsFacadeMock.unselectHandCard).not.toHaveBeenCalled();
        expect(gameFacadeMock.setAction).not.toHaveBeenCalled();
        expect(
          discardPileCardsFacadeMock.addCardToDiscardPile
        ).not.toHaveBeenCalled();
      });
    });
  });

  describe('getVictoryPointsForDomain', () => {
    describe('no mastery', () => {
      const domainsCardsFacadeMock = {
        getCardsVictoryPointsForDomain: jest.fn(() => of(2)),
        getMasteryDomainForType: jest.fn(() => of(undefined)),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should combine cards victory points
          and neither trade nor strength victory points`, () => {
        const victoryPoints$ = service.getVictoryPointsForDomain(ID_DOMAIN_RED);

        victoryPoints$.subscribe((victoryPoints) => {
          expect(victoryPoints).toEqual(2);
        });
      });
    });

    describe('trade mastery', () => {
      const domainsCardsFacadeMock = {
        getCardsVictoryPointsForDomain: jest.fn(() => of(2)),
        getMasteryDomainForType: jest.fn((type) =>
          type === MasteryPointsType.Trade ? of(ID_DOMAIN_RED) : of(undefined)
        ),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should combine cards victory points
          and trade but not strength victory points`, () => {
        const victoryPoints$ = service.getVictoryPointsForDomain(ID_DOMAIN_RED);

        victoryPoints$.subscribe((victoryPoints) => {
          expect(victoryPoints).toEqual(3);
        });
      });
    });

    describe('strength mastery', () => {
      const domainsCardsFacadeMock = {
        getCardsVictoryPointsForDomain: jest.fn(() => of(2)),
        getMasteryDomainForType: jest.fn((type) =>
          type === MasteryPointsType.Strength
            ? of(ID_DOMAIN_RED)
            : of(undefined)
        ),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should combine cards victory points
          and not trade but strength victory points`, () => {
        const victoryPoints$ = service.getVictoryPointsForDomain(ID_DOMAIN_RED);

        victoryPoints$.subscribe((victoryPoints) => {
          expect(victoryPoints).toEqual(3);
        });
      });
    });

    describe('both mastery', () => {
      const domainsCardsFacadeMock = {
        getCardsVictoryPointsForDomain: jest.fn(() => of(2)),
        getMasteryDomainForType: jest.fn(() => of(ID_DOMAIN_RED)),
      };

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [StoreModule.forRoot({})],
          providers: [
            { provide: DomainsCardsFacade, useValue: domainsCardsFacadeMock },
          ],
        });
        service = TestBed.inject(GameRulesService);
      });

      it(`should combine cards victory points
          and trade and strength victory points`, () => {
        const victoryPoints$ = service.getVictoryPointsForDomain(ID_DOMAIN_RED);

        victoryPoints$.subscribe((victoryPoints) => {
          expect(victoryPoints).toEqual(4);
        });
      });
    });
  });
});
