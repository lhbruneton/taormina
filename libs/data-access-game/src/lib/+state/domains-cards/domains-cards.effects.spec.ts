import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { ID_DOMAIN_BLUE, ID_DOMAIN_RED } from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  LAND_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as DomainsCardsActions from './domains-cards.actions';
import { DomainsCardsEffects } from './domains-cards.effects';
import * as DomainsCardsSelectors from './domains-cards.selectors';

jest.mock('./domains-cards.models', () => {
  return {
    __esModule: true,
    createInitialDomainsCards: jest.fn(() => []),
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
    it('should work', () => {
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
    it('should work', () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.initDomainsCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.loadDomainsCardsSuccess({ domainsCards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('increaseResourceValue$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: DomainsCardsSelectors.getLandCardsPivotsForDie,
                value: [
                  {
                    id: 'AAA',
                    domainId: ID_DOMAIN_RED,
                    cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
                    cardId: 'ROAD_1',
                  },
                  {
                    id: 'BBB',
                    domainId: ID_DOMAIN_BLUE,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_1',
                    availableResources: 0,
                  },
                  {
                    id: 'CCC',
                    domainId: ID_DOMAIN_RED,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_2',
                    availableResources: 3,
                  },
                  {
                    id: 'DDD',
                    domainId: ID_DOMAIN_BLUE,
                    cardType: LAND_CARD_INTERFACE_NAME,
                    cardId: 'LAND_3',
                  },
                ],
              },
            ],
          }),
        ],
      });
      injector.get(MockStore);
    });

    it('should dispatch updateDomainsCards with availableResources + 1 when availableResources < 3', () => {
      actions = hot('-a-|', {
        a: DomainsCardsActions.increaseAvailableResourcesForDie({ die: 1 }),
      });

      const expected = hot('-a-|', {
        a: DomainsCardsActions.updateDomainsCards({
          updates: [
            {
              id: 'BBB',
              changes: { availableResources: 1 },
            },
          ],
        }),
      });

      expect(effects.increaseResourceValue$).toBeObservable(expected);
    });
  });
});
