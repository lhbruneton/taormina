import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as DomainCardsActions from './domain-cards.actions';
import { DomainCardsEffects } from './domain-cards.effects';
import { DomainCardsFacade } from './domain-cards.facade';
import { createDomainCardsEntity } from './domain-cards.models';
import {
  domainCardsReducer,
  DomainCardsState,
  DOMAIN_CARDS_FEATURE_KEY,
} from './domain-cards.reducer';

interface TestSchema {
  domainCards: DomainCardsState;
}

describe('DomainCardsFacade', () => {
  let facade: DomainCardsFacade;
  let store: Store<TestSchema>;

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
              createDomainCardsEntity('AAA', 'A', 'A', 0, 0),
              createDomainCardsEntity('BBB', 'B', 'B', 0, 0),
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
