import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { LandsPileCardsEntity } from './lands-pile-cards.models';
import { LandsPileCardsEffects } from './lands-pile-cards.effects';
import { LandsPileCardsFacade } from './lands-pile-cards.facade';

import * as LandsPileCardsSelectors from './lands-pile-cards.selectors';
import * as LandsPileCardsActions from './lands-pile-cards.actions';
import {
  LANDS_PILE_CARDS_FEATURE_KEY,
  LandsPileCardsState,
  initialLandsPileCardsState,
  landsPileCardsReducer,
} from './lands-pile-cards.reducer';

interface TestSchema {
  landsPileCards: LandsPileCardsState;
}

describe('LandsPileCardsFacade', () => {
  let facade: LandsPileCardsFacade;
  let store: Store<TestSchema>;
  const createLandsPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LandsPileCardsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            LANDS_PILE_CARDS_FEATURE_KEY,
            landsPileCardsReducer
          ),
          EffectsModule.forFeature([LandsPileCardsEffects]),
        ],
        providers: [LandsPileCardsFacade],
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
      facade = TestBed.get(LandsPileCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allLandsPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allLandsPileCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadLandsPileCardsSuccess` to manually update list
     */
    it('allLandsPileCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allLandsPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          LandsPileCardsActions.loadLandsPileCardsSuccess({
            landsPileCards: [
              createLandsPileCardsEntity('AAA'),
              createLandsPileCardsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allLandsPileCards$);
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
