import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as HandCardsActions from './hand-cards.actions';
import { HandCardsEffects } from './hand-cards.effects';
import { HandCardsFacade } from './hand-cards.facade';
import { createHandCardsEntity } from './hand-cards.models';
import {
  handCardsReducer,
  HandCardsState,
  HAND_CARDS_FEATURE_KEY,
} from './hand-cards.reducer';

interface TestSchema {
  handCards: HandCardsState;
}

describe('HandCardsFacade', () => {
  let facade: HandCardsFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HAND_CARDS_FEATURE_KEY, handCardsReducer),
          EffectsModule.forFeature([HandCardsEffects]),
        ],
        providers: [HandCardsFacade],
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
      facade = TestBed.get(HandCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allHandCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allHandCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadHandCardsSuccess` to manually update list
     */
    it('allHandCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allHandCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          HandCardsActions.loadHandCardsSuccess({
            handCards: [
              createHandCardsEntity('AAA', 'A', 'A'),
              createHandCardsEntity('BBB', 'B', 'B'),
            ],
          })
        );

        list = await readFirst(facade.allHandCards$);
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
