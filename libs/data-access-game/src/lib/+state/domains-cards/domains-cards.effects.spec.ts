import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, createSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
  ID_CLAY_PIT_BLUE,
  ID_CLAY_PIT_RED,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_FOREST_BLUE,
  ID_FOREST_RED,
  ID_GOLD_MINE_RED,
  ID_PASTURE_BLUE,
} from '@taormina/shared-constants';
import {
  AVAILABLE_AGGLOMERATION_SLOT,
  LAND_CARD_INTERFACE_NAME,
  ResourceValue,
} from '@taormina/shared-models';
import { hot } from 'jasmine-marbles';
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
      providers: [
        DomainsCardsEffects,
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
    it(`should dispatch updateDomainsCards
        with availableResources + 1
        when not next to a production building
        and availableResources < 3`, () => {
      jest
        .spyOn(DomainsCardsSelectors, 'getLandCardsPivotsIncreaseOneProduction')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((_die: ResourceValue) =>
          createSelector(
            () => [] as DomainsCardsModels.DomainsCardsEntity[],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) => [
              {
                id: 'AAA',
                domainId: ID_DOMAIN_RED,
                cardType: LAND_CARD_INTERFACE_NAME,
                cardId: ID_CLAY_PIT_RED,
                availableResources: 0,
              } as DomainsCardsModels.DomainsCardsEntity,
              {
                id: 'BBB',
                domainId: ID_DOMAIN_RED,
                cardType: LAND_CARD_INTERFACE_NAME,
                cardId: ID_CLAY_PIT_RED,
                availableResources: 3,
              } as DomainsCardsModels.DomainsCardsEntity,
            ]
          )
        );

      jest
        .spyOn(DomainsCardsSelectors, 'getLandCardsPivotsIncreaseTwoProduction')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .mockImplementation((_die: ResourceValue) =>
          createSelector(
            () => [] as DomainsCardsModels.DomainsCardsEntity[],
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (_) => [
              {
                id: 'CCC',
                domainId: ID_DOMAIN_BLUE,
                cardType: LAND_CARD_INTERFACE_NAME,
                cardId: ID_FOREST_BLUE,
                availableResources: 0,
              } as DomainsCardsModels.DomainsCardsEntity,
              {
                id: 'DDD',
                domainId: ID_DOMAIN_BLUE,
                cardType: LAND_CARD_INTERFACE_NAME,
                cardId: ID_FOREST_BLUE,
                availableResources: 2,
              } as DomainsCardsModels.DomainsCardsEntity,
              {
                id: 'EEE',
                domainId: ID_DOMAIN_BLUE,
                cardType: LAND_CARD_INTERFACE_NAME,
                cardId: ID_FOREST_BLUE,
                availableResources: 3,
              } as DomainsCardsModels.DomainsCardsEntity,
            ]
          )
        );

      actions = hot('-a-|', {
        a: DomainsCardsActions.increaseAvailableResourcesForDie({
          die: 3,
        }),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.updateDomainsCards({
          updates: [
            {
              id: 'AAA',
              changes: { availableResources: 1 },
            },
            {
              id: 'CCC',
              changes: { availableResources: 2 },
            },
            {
              id: 'DDD',
              changes: { availableResources: 3 },
            },
          ],
        }),
      });

      expect(effects.increaseResourcesForDie$).toBeObservable(expected);
    });
  });

  describe('lockResource$', () => {
    describe('OK', () => {
      it(`should dispatch updateDomainCard
          with availableResources - 1 and lockedResources + 1`, () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 3,
                  lockedResources: 0,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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
      it('should dispatch setDomainsCardsError with pivot error', () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                undefined as DomainsCardsModels.DomainsCardsEntity | undefined
            )
          );

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
      it(`should dispatch setDomainsCardsError
          with unavailable resource error`, () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 0,
                  lockedResources: 0,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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
      it(`should dispatch setDomainsCardsError
          with too many locked resources error`, () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 1,
                  lockedResources: 3,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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
      it(`should dispatch updateDomainCard
          with availableResources += lockedResources
          and lockedResources = 0`, () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 1,
                  lockedResources: 2,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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
      it('should dispatch setDomainsCardsError with pivot error', () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                undefined as DomainsCardsModels.DomainsCardsEntity | undefined
            )
          );

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
      it(`should dispatch setDomainsCardsError
          with too many locked resources error`, () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 2,
                  lockedResources: 2,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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

  describe('giveLockedResources$', () => {
    describe('OK', () => {
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
                      cardId: ID_CLAY_PIT_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                    {
                      id: 'BBB',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: 'LAND_1',
                      availableResources: 0,
                      lockedResources: 1,
                    },
                  ],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [
                    {
                      id: 'CCC',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_CLAY_PIT_BLUE,
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

      it(`should dispatch updateDomainsCards
          with lockedResources = 0 for pivots with locked resources
          and availableResources += lockedResources for selected pivot`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
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
              {
                id: 'CCC',
                changes: { availableResources: 3 },
              },
            ],
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });

    describe('KO no pivots with locked resources', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector:
                    DomainsCardsSelectors.getLandCardPivotWithLockedResources,
                  value: [],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [
                    {
                      id: 'AAA',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_CLAY_PIT_BLUE,
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

      it('should dispatch setDomainsCardsError with no pivots with locked resources error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't give locked resources if no pivots with locked resources.`,
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });

    describe('KO pivots with locked resources of different types', () => {
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
                      cardId: ID_CLAY_PIT_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                    {
                      id: 'BBB',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_FOREST_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                  ],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [
                    {
                      id: 'CCC',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_CLAY_PIT_BLUE,
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

      it('should dispatch setDomainsCardsError with locked resources of different types error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't give locked resources of different types.`,
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });

    describe('KO no pivot selected', () => {
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
                      cardId: ID_CLAY_PIT_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                  ],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [],
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setDomainsCardsError with no pivot selected error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't give locked resources if no pivot or more than one pivot selected.`,
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });

    describe('KO more than one pivot selected', () => {
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
                      cardId: ID_CLAY_PIT_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                  ],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [
                    {
                      id: 'BBB',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_CLAY_PIT_BLUE,
                      availableResources: 1,
                      lockedResources: 0,
                    },
                    {
                      id: 'CCC',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_FOREST_BLUE,
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

      it('should dispatch setDomainsCardsError with more than one pivot selected error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't give locked resources if no pivot or more than one pivot selected.`,
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });

    describe('KO selected pivot of different type than locked resources', () => {
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
                      cardId: ID_CLAY_PIT_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                  ],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [
                    {
                      id: 'BBB',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_FOREST_BLUE,
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

      it(`should dispatch setDomainsCardsError
          with selected pivot of different type than locked resources error`, () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't give locked resources to pivot of different type.`,
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });

    describe('KO too many locked resources to give', () => {
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
                      cardId: ID_CLAY_PIT_RED,
                      availableResources: 0,
                      lockedResources: 1,
                    },
                    {
                      id: 'BBB',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: 'LAND_1',
                      availableResources: 0,
                      lockedResources: 1,
                    },
                  ],
                },
                {
                  selector: DomainsCardsSelectors.getDomainsCardsSelected,
                  value: [
                    {
                      id: 'CCC',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: ID_CLAY_PIT_BLUE,
                      availableResources: 2,
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

      it('should dispatch setDomainsCardsError with too many locked resources to give error', () => {
        actions = hot('-a-|', {
          a: DomainsCardsActions.giveLockedResources(),
        });

        const expected = hot('-a-|', {
          a: DomainsCardsActions.setDomainsCardsError({
            error: `Can't give so many locked resources to selected pivot.`,
          }),
        });

        expect(effects.giveLockedResources$).toBeObservable(expected);
      });
    });
  });

  describe('increaseResources$', () => {
    describe('OK', () => {
      it('should dispatch updateDomainCard with availableResources + 1', () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 0,
                  lockedResources: 0,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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
      it('should dispatch setDomainsCardsError with pivot error', () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                undefined as DomainsCardsModels.DomainsCardsEntity | undefined
            )
          );

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
      it(`should dispatch setDomainsCardsError
          with too many available resources error`, () => {
        jest
          .spyOn(DomainsCardsSelectors, 'getLandCardPivotById')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_id: string) =>
            createSelector(
              () => [] as DomainsCardsModels.DomainsCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: 'AAA',
                  domainId: ID_DOMAIN_RED,
                  cardType: LAND_CARD_INTERFACE_NAME,
                  cardId: 'LAND_1',
                  availableResources: 3,
                  lockedResources: 0,
                } as DomainsCardsModels.DomainsCardsEntity | undefined)
            )
          );

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
                  // eslint-disable-next-line no-magic-numbers
                  value: [6, 7],
                },
                {
                  selector:
                    DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures,
                  value: [
                    [
                      {
                        id: 'aaaa',
                        domainId: ID_DOMAIN_RED,
                        cardType: LAND_CARD_INTERFACE_NAME,
                        cardId: ID_GOLD_MINE_RED,
                        availableResources: 1,
                        lockedResources: 0,
                      },
                    ],
                    [
                      {
                        id: 'bbbb',
                        domainId: ID_DOMAIN_BLUE,
                        cardType: LAND_CARD_INTERFACE_NAME,
                        cardId: ID_PASTURE_BLUE,
                        availableResources: 1,
                        lockedResources: 0,
                      },
                    ],
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
                  // eslint-disable-next-line no-magic-numbers
                  value: [8, 7],
                },
                {
                  selector:
                    DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures,
                  value: [
                    [
                      {
                        id: 'aaaa',
                        domainId: ID_DOMAIN_RED,
                        cardType: LAND_CARD_INTERFACE_NAME,
                        cardId: ID_GOLD_MINE_RED,
                        availableResources: 1,
                        lockedResources: 0,
                      },
                    ],
                    [
                      {
                        id: 'bbbb',
                        domainId: ID_DOMAIN_BLUE,
                        cardType: LAND_CARD_INTERFACE_NAME,
                        cardId: ID_PASTURE_BLUE,
                        availableResources: 1,
                        lockedResources: 0,
                      },
                    ],
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
            ],
          }),
        });

        expect(effects.countStealResources$).toBeObservable(expected);
      });
    });
  });

  describe('increaseResourcesAuspiciousYear$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector:
                  DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear,
                value: [
                  [
                    {
                      id: 'aaaa',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: 'LAND_1',
                      availableResources: 0,
                    },
                  ],
                  [
                    {
                      id: 'bbbb',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: 'LAND_2',
                      availableResources: 0,
                    },
                  ],
                  [
                    {
                      id: 'cccc',
                      domainId: ID_DOMAIN_BLUE,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: 'LAND_3',
                      availableResources: 0,
                    },
                  ],
                  [
                    {
                      id: 'dddd',
                      domainId: ID_DOMAIN_RED,
                      cardType: LAND_CARD_INTERFACE_NAME,
                      cardId: 'LAND_4',
                      availableResources: 0,
                    },
                  ],
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
        a: DomainsCardsActions.increaseAvailableResourcesForAuspiciousYear(),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.updateDomainsCards({
          updates: [
            {
              id: 'aaaa',
              changes: { availableResources: 1 },
            },
            {
              id: 'bbbb',
              changes: { availableResources: 2 },
            },
            {
              id: 'cccc',
              changes: { availableResources: 3 },
            },
            {
              id: 'dddd',
              changes: { availableResources: 3 },
            },
          ],
        }),
      });

      expect(effects.increaseResourcesAuspiciousYear$).toBeObservable(expected);
    });
  });
});
