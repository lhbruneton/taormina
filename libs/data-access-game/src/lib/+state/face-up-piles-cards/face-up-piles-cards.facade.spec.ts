/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { FaceUpPilesCardsEffects } from './face-up-piles-cards.effects';
import { FaceUpPilesCardsFacade } from './face-up-piles-cards.facade';
import { createFaceUpPilesCardsEntity } from './face-up-piles-cards.models';
import {
  faceUpPilesCardsReducer,
  FaceUpPilesCardsState,
  FACE_UP_PILES_CARDS_FEATURE_KEY,
} from './face-up-piles-cards.reducer';

interface TestSchema {
  faceUpPilesCards: FaceUpPilesCardsState;
}

describe('FaceUpPilesCardsFacade', () => {
  let facade: FaceUpPilesCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            FACE_UP_PILES_CARDS_FEATURE_KEY,
            faceUpPilesCardsReducer
          ),
          EffectsModule.forFeature([FaceUpPilesCardsEffects]),
        ],
        providers: [FaceUpPilesCardsFacade],
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
      facade = TestBed.get(FaceUpPilesCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allFaceUpPilesCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allFaceUpPilesCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadFaceUpPilesCardsSuccess` to manually update list
     */
    it('allFaceUpPilesCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allFaceUpPilesCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess({
            faceUpPilesCards: [
              createFaceUpPilesCardsEntity('AAA', 'A', 'A'),
              createFaceUpPilesCardsEntity('BBB', 'B', 'B'),
            ],
          })
        );

        list = await readFirst(facade.allFaceUpPilesCards$);
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
