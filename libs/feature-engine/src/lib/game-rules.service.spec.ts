/* eslint-disable no-magic-numbers */
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
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
  ID_HAND_RED,
} from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  EventValue,
  GamePhase,
  LAND_CARD_INTERFACE_NAME,
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

  describe('countAndSteal$', () => {
    it(
      'should call countAndStealUnprotectedGoldAndWool on thieves and complete on gameEnded',
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

  describe('increaseResources$', () => {
    it(
      'should complete on gameEnded',
      marbles((m) => {
        // Given a stream of productions and an increaseResources$ stream build on it
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
        // Then the increaseResources$ stream completes
        const expected$ = m.cold('--a|', { a: undefined });
        m.expect(service.increaseResources$).toBeObservable(expected$);
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
      const increaseResourcesSubscribeSpy = jest.spyOn(
        service.increaseResources$,
        'subscribe'
      );

      service.initNewGame();

      expect(gameEndedNextSpy).toHaveBeenCalledTimes(1);
      expect(countAndStealSubscribeSpy).toHaveBeenCalledTimes(1);
      expect(increaseResourcesSubscribeSpy).toHaveBeenCalledTimes(1);

      expect(gameFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(domainsCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(handsCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(faceUpPilesCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(landsPileCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(stockPilesCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
      expect(eventsPileCardsFacadeMock.initNewGame).toHaveBeenCalledTimes(1);
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
      removeCardsFromStockPile: jest.fn(),
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

    it('should call removeCardsFromStockPile, then addCardsToHand', () => {
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
        stockPilesCardsFacadeMock.removeCardsFromStockPile
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

      it('should call throwEventDie, throwProductionDie and countAndStealUnprotectedGoldAndWool', () => {
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
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_AGGLOMERATION_SLOT,
          cardId: undefined,
          col: 2,
          row: 0,
        }),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        unselectDomainCard: jest.fn(),
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

      it('should call useLockedResources, removeFaceUpPileCard, putCardInSlot, createAvailableDomainCard, unselectDomainCard', () => {
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
        expect(domainsCardsFacadeMock.unselectDomainCard).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('OK hamlet', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_AGGLOMERATION_SLOT,
          cardId: undefined,
          col: -3,
          row: 0,
        }),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        unselectDomainCard: jest.fn(),
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

      it('should call useLockedResources, removeFaceUpPileCard, putCardInSlot, createAvailableDomainCard x3, unselectDomainCard', () => {
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
        expect(domainsCardsFacadeMock.unselectDomainCard).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('OK town', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AGGLOMERATION_CARD_INTERFACE_NAME,
          cardId: 'aaaa',
          col: -1,
          row: 0,
        }),
        createAvailableDomainCard: jest.fn(),
        putCardInSlot: jest.fn(),
        unselectDomainCard: jest.fn(),
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

      it('should call useLockedResources, removeFaceUpPileCard, putCardInSlot, createAvailableDomainCard x2, unselectDomainCard', () => {
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
        expect(domainsCardsFacadeMock.unselectDomainCard).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('NOK undefined selectedFaceUpPilesCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_AGGLOMERATION_SLOT,
          cardId: undefined,
          col: -2,
          row: 0,
        }),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of(undefined),
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
      it('should call useLockedResources', () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('NOK undefined selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of(undefined),
        useLockedResources: jest.fn(),
      };
      const faceUpPilesCardsFacadeMock = {
        selectedFaceUpPilesCards$: of({
          id: 'aaaa',
          pileId: ID_FACE_UP_ROAD,
          cardId: 'ROAD_1',
        }),
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
      it('should call useLockedResources', () => {
        service.useResourcesToPutFaceUpPileCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
      });
    });
  });

  describe('useResourcesToPutHandCardInSlot', () => {
    describe('OK', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_DEVELOPMENT_SLOT,
          cardId: undefined,
          col: -1,
          row: -1,
        }),
        putCardInSlot: jest.fn(),
        unselectDomainCard: jest.fn(),
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

      it('should call useLockedResources, removeHandCard, putCardInSlot, unselectDomainCard', () => {
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
        expect(domainsCardsFacadeMock.unselectDomainCard).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('NOK undefined selectedHandsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_DEVELOPMENT_SLOT,
          cardId: undefined,
          col: -1,
          row: -1,
        }),
        useLockedResources: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of(undefined),
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
      it('should call useLockedResources', () => {
        service.useResourcesToPutHandCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('NOK undefined selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of(undefined),
        useLockedResources: jest.fn(),
      };
      const handsCardsFacadeMock = {
        selectedHandsCards$: of({
          id: 'aaaa',
          handId: ID_DOMAIN_RED,
          cardId: 'SHIP_1',
        }),
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
      it('should call useLockedResources', () => {
        service.useResourcesToPutHandCardInSlot();

        expect(domainsCardsFacadeMock.useLockedResources).toHaveBeenCalledTimes(
          1
        );
      });
    });
  });

  describe('putLandsPileCardInSlot', () => {
    describe('OK', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_LAND_SLOT,
          cardId: undefined,
          col: -4,
          row: -1,
        }),
        putCardInSlot: jest.fn(),
        unselectDomainCard: jest.fn(),
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

      it('should call removeLandsPileCard, putCardInSlot, unselectDomainCard', () => {
        service.putLandsPileCardInSlot();

        expect(
          landsPileCardsFacadeMock.removeLandsPileCard
        ).toHaveBeenCalledWith('aaaa');
        expect(domainsCardsFacadeMock.putCardInSlot).toHaveBeenCalledWith(
          'aaaa',
          LAND_CARD_INTERFACE_NAME,
          'LAND_1'
        );
        expect(domainsCardsFacadeMock.unselectDomainCard).toHaveBeenCalledTimes(
          1
        );
      });
    });

    describe('NOK undefined selectedLandsPileCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of({
          id: 'aaaa',
          domainId: ID_DOMAIN_RED,
          cartType: AVAILABLE_LAND_SLOT,
          cardId: undefined,
          col: -4,
          row: -1,
        }),
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
      });
    });

    describe('NOK undefined selectedDomainsCards', () => {
      const domainsCardsFacadeMock = {
        selectedDomainsCards$: of(undefined),
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
      });
    });
  });
});
