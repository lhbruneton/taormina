import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import {
  ID_CLAY_PIT_RED,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_FOREST_BLUE,
  ID_GOLD_MINE_RED,
  ID_PASTURE_BLUE,
} from '@taormina/shared-constants';
import {
  AVAILABLE_AGGLOMERATION_SLOT,
  LAND_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as DomainsCardsActions from './domains-cards.actions';
import { DomainsCardsEffects } from './domains-cards.effects';
import * as DomainsCardsModels from './domains-cards.models';
import * as DomainsCardsSelectors from './domains-cards.selectors';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn(() => 'aaaa'),
  };
});

describe('DomainsCardsEffects', () => {
  let injector: Injector;
  let actions: Observable<Action>;
  let effects: DomainsCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DomainsCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DomainsCardsEffects);
  });

  describe('initNewGame$', () => {
    it(`should dispatch setDomainsCardsInitialized
        with mocked empty initial domains cards`, () => {
      jest
        .spyOn(DomainsCardsModels, 'createInitialDomainsCards')
        .mockReturnValue([]);

      actions = hot('-a-|', {
        a: DomainsCardsActions.initDomainsCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.setDomainsCardsInitialized({
          domainsCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it(`should dispatch loadDomainsCardsSuccess
        with empty domains cards`, () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.initDomainsCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.loadDomainsCardsSuccess({ domainsCards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('increaseResourcesForDie$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector:
                  DomainsCardsSelectors.getLandCardsPivotsIncreaseOneProduction,
                value: [
                  {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: ID_CLAY_PIT_RED,
                    availableResources: 0,
                  },
                  {
                    id: 'BBB',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: ID_CLAY_PIT_RED,
                    availableResources: 3,
                  },
                ],
              },
              {
                selector:
                  DomainsCardsSelectors.getLandCardsPivotsIncreaseTwoProduction,
                value: [
                  {
                    id: 'CCC',
                    domainId: ID_DOMAIN_BLUE,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: ID_FOREST_BLUE,
                    availableResources: 0,
                  },
                  {
                    id: 'DDD',
                    domainId: ID_DOMAIN_BLUE,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: ID_FOREST_BLUE,
                    availableResources: 2,
                  },
                  {
                    id: 'EEE',
                    domainId: ID_DOMAIN_BLUE,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: ID_FOREST_BLUE,
                    availableResources: 3,
                  },
                ],
              },
            ],
          }),
        ],
      });
      injector.get(MockStore);
    });

    it(`should dispatch updateDomainsCards
        with availableResources + 1
        when not next to a production building
        and availableResources < 3`, () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.increaseAvailableResourcesForDie({ die: 3 }),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.updateDomainsCards({
          updates: [
            {
              id: 'AAA',
              changes: { availableResources: 1 },
            },
            {
              id: 'DDD',
              changes: { availableResources: 3 },
            },
            {
              id: 'CCC',
              changes: { availableResources: 2 },
            },
          ],
        }),
      });

      expect(effects.increaseResourcesForDie$).toBeObservable(expected);
    });
  });

  describe('lockResource$', () => {
    describe('OK', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 3,
                    lockedResources: 0,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch updateDomainCard
          with availableResources - 1 and lockedResources + 1`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.lockResource({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.updateDomainCard({
            update: {
              id: 'AAA',
              changes: { availableResources: 2, lockedResources: 1 },
            },
          }),
        });

        expect(effects.lockResource$).toBeObservable(expected);
      });
    });

    describe('KO pivot undefined', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: undefined,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setDomainsCardsError with pivot error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.lockResource({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Couldn't find land card pivot for id.`,
          }),
        });

        expect(effects.lockResource$).toBeObservable(expected);
      });
    });

    describe('KO unavailable resource', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 0,
                    lockedResources: 0,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch setDomainsCardsError
          with unavailable resource error`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.lockResource({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't lock unavailable resource for pivot AAA.`,
          }),
        });

        expect(effects.lockResource$).toBeObservable(expected);
      });
    });

    describe('KO too many locked resources', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 1,
                    lockedResources: 3,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch setDomainsCardsError
          with too many locked resources error`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.lockResource({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't lock more resources for pivot AAA.`,
          }),
        });

        expect(effects.lockResource$).toBeObservable(expected);
      });
    });
  });

  describe('unlockResources$', () => {
    describe('OK', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 1,
                    lockedResources: 2,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch updateDomainCard
          with availableResources += lockedResources
          and lockedResources = 0`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.unlockResources({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.updateDomainCard({
            update: {
              id: 'AAA',
              changes: { availableResources: 3, lockedResources: 0 },
            },
          }),
        });

        expect(effects.unlockResources$).toBeObservable(expected);
      });
    });

    describe('KO pivot undefined', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: undefined,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setDomainsCardsError with pivot error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.unlockResources({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Couldn't find land card pivot for id.`,
          }),
        });

        expect(effects.unlockResources$).toBeObservable(expected);
      });
    });

    describe('KO too many locked resources', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 2,
                    lockedResources: 2,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch setDomainsCardsError
          with too many locked resources error`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.unlockResources({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Shouldn't have been able to lock so many resources for pivot AAA.`,
          }),
        });

        expect(effects.unlockResources$).toBeObservable(expected);
      });
    });
  });

  describe('useLockedResources$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector:
                  DomainsCardsSelectors.getLandCardPivotWithLockedResources,
                value: [
                  {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 1,
                    lockedResources: 2,
                  },
                  {
                    id: 'BBB',
                    domainId: ID_DOMAIN_BLUE,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_2',
                    availableResources: 0,
                    lockedResources: 1,
                  },
                ],
              },
            ],
          }),
        ],
      });
      injector.get(MockStore);
    });

    it('should dispatch updateDomainsCards with lockedResources = 0', () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.useLockedResources(),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.updateDomainsCards({
          updates: [
            {
              id: 'AAA',
              changes: { lockedResources: 0 },
            },
            {
              id: 'BBB',
              changes: { lockedResources: 0 },
            },
          ],
        }),
      });

      expect(effects.useLockedResources$).toBeObservable(expected);
    });
  });

  describe('increaseResources$', () => {
    describe('OK', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 0,
                    lockedResources: 0,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch updateDomainCard with availableResources + 1', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.increaseAvailableResources({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.updateDomainCard({
            update: {
              id: 'AAA',
              changes: { availableResources: 1 },
            },
          }),
        });

        expect(effects.increaseResources$).toBeObservable(expected);
      });
    });

    describe('KO pivot undefined', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: undefined,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setDomainsCardsError with pivot error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.increaseAvailableResources({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Couldn't find land card pivot for id.`,
          }),
        });

        expect(effects.increaseResources$).toBeObservable(expected);
      });
    });

    describe('KO too many available resources', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: DomainsCardsSelectors.getLandCardPivotById,
                  value: {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 3,
                    lockedResources: 0,
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch setDomainsCardsError
          with too many available resources error`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.increaseAvailableResources({ id: 'AAA' }),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't increase available resources beyond maximum for pivot AAA.`,
          }),
        });

        expect(effects.increaseResources$).toBeObservable(expected);
      });
    });
  });

  describe('putCardInPivot$', () => {
    it('should dispatch updateDomainCard with card type and id', () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.putCardInPivot({
          id: 'AAA',
          cardType: LAND_CARD_INTERFACE_NAME,
          cardId: 'LAND_1',
        }),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.updateDomainCard({
          update: {
            id: 'AAA',
            changes: { cardType: LAND_CARD_INTERFACE_NAME, cardId: 'LAND_1' },
          },
        }),
      });

      expect(effects.putCardInPivot$).toBeObservable(expected);
    });
  });

  describe('createCard$', () => {
    it('should dispatch addDomainCard with mocked uuid', () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.createDomainCard({
          domainId: 'A',
          cardType: AVAILABLE_AGGLOMERATION_SLOT,
          cardId: undefined,
          col: -2,
          row: 0,
        }),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.addDomainCard({
          domainCard: {
            id: 'aaaa',
            domainId: 'A',
            cardType: AVAILABLE_AGGLOMERATION_SLOT,
            cardId: undefined,
            col: -2,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        }),
      });

      expect(effects.createCard$).toBeObservable(expected);
    });
  });

  describe('countStealResources$', () => {
    describe('not enough resources', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector:
                    DomainsCardsSelectors.getDomainResourceCountSeenByThieves,
                  value: 7,
                },
                {
                  selector:
                    DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures,
                  value: [
                    {
                      id: 'aaaa',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_GOLD_MINE_RED,
                      availableResources: 1,
                      lockedResources: 0,
                    },
                    {
                      id: 'bbbb',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_PASTURE_BLUE,
                      availableResources: 1,
                      lockedResources: 0,
                    },
                  ],
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch updateDomainsCards with empty array', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.countAndStealUnprotectedGoldAndWool(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.updateDomainsCards({ updates: [] }),
        });

        expect(effects.countStealResources$).toBeObservable(expected);
      });
    });

    describe('enough resources', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector:
                    DomainsCardsSelectors.getDomainResourceCountSeenByThieves,
                  value: 8,
                },
                {
                  selector:
                    DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures,
                  value: [
                    {
                      id: 'aaaa',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_GOLD_MINE_RED,
                      availableResources: 1,
                      lockedResources: 0,
                    },
                    {
                      id: 'bbbb',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_PASTURE_BLUE,
                      availableResources: 1,
                      lockedResources: 0,
                    },
                  ],
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch updateDomainsCards with array of changes', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.countAndStealUnprotectedGoldAndWool(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.updateDomainsCards({
            updates: [
              {
                id: 'aaaa',
                changes: { availableResources: 0 },
              },
              {
                id: 'bbbb',
                changes: { availableResources: 0 },
              },
              // FIXME: https://github.com/ngrx/platform/issues/2176
              {
                id: 'aaaa',
                changes: { availableResources: 0 },
              },
              {
                id: 'bbbb',
                changes: { availableResources: 0 },
              },
            ],
          }),
        });

        expect(effects.countStealResources$).toBeObservable(expected);
      });
    });
  });
});
