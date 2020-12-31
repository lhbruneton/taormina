import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DomainCardsEntity } from './domain-cards.models';
import { DomainCardsEffects } from './domain-cards.effects';
import { DomainCardsFacade } from './domain-cards.facade';

import * as DomainCardsSelectors from './domain-cards.selectors';
import * as DomainCardsActions from './domain-cards.actions';
import {
  DOMAIN_CARDS_FEATURE_KEY,
  DomainCardsState,
  initialDomainCardsState,
  domainCardsReducer,
} from './domain-cards.reducer';

interface TestSchema {
  domainCards: DomainCardsState;
}

describe('DomainCardsFacade', () => {
  let facade: DomainCardsFacade;
  let store: Store<TestSchema>;
  const createDomainCardsEntity = (
    id: string,
    domainId = '',
    cardId = '',
    col = 0,
    row = 0
  ) =>
    ({
      id,
      domainId: domainId || `domainId-${id}`,
      cardId: cardId || `cardId-${id}`,
      col,
      row,
    } as DomainCardsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DOMAIN_CARDS_FEATURE_KEY, domainCardsReducer),
          EffectsModule.forFeature([DomainCardsEffects]),
        ],
        providers: [DomainCardsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(DomainCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDomainCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allDomainCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDomainCardsSuccess` to manually update list
     */
    it('allDomainCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDomainCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DomainCardsActions.loadDomainCardsSuccess({
            domainCards: [
              createDomainCardsEntity('AAA'),
              createDomainCardsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allDomainCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
