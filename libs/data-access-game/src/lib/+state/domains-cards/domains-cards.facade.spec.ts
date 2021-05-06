/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

import * as DomainsCardsActions from './domains-cards.actions';
import { DomainsCardsEffects } from './domains-cards.effects';
import { DomainsCardsFacade } from './domains-cards.facade';
import { createDomainsCardsEntity } from './domains-cards.models';
import {
  domainsCardsReducer,
  DomainsCardsState,
  DOMAINS_CARDS_FEATURE_KEY,
} from './domains-cards.reducer';

interface TestSchema {
  domainsCards: DomainsCardsState;
}

describe('DomainsCardsFacade', () => {
  let facade: DomainsCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            DOMAINS_CARDS_FEATURE_KEY,
            domainsCardsReducer
          ),
          EffectsModule.forFeature([DomainsCardsEffects]),
        ],
        providers: [DomainsCardsFacade],
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
      facade = TestBed.get(DomainsCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDomainsCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allDomainsCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDomainsCardsSuccess` to manually update list
     */
    it('allDomainsCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDomainsCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DomainsCardsActions.loadDomainsCardsSuccess({
            domainsCards: [
              createDomainsCardsEntity(
                'AAA',
                'A',
                AGGLOMERATION_CARD_INTERFACE_NAME,
                'A',
                0,
                0
              ),
              createDomainsCardsEntity(
                'BBB',
                'B',
                DEVELOPMENT_CARD_INTERFACE_NAME,
                'B',
                0,
                0
              ),
            ],
          })
        );

        list = await readFirst(facade.allDomainsCards$);
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
