import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { AgglomerationType, ResourceType } from '@taormina/shared-models';

import { createAgglomerationCardsEntity } from '../cards/models/agglomeration';
import * as FaceUpPilesActions from './face-up-piles.actions';
import { FaceUpPilesEffects } from './face-up-piles.effects';
import { FaceUpPilesFacade } from './face-up-piles.facade';
import {
  faceUpPilesReducer,
  FaceUpState,
  FACE_UP_PILES_FEATURE_KEY,
} from './face-up-piles.reducer';

interface TestSchema {
  faceUpPiles: FaceUpState;
}

describe('FaceUpPilesFacade', () => {
  let facade: FaceUpPilesFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(FACE_UP_PILES_FEATURE_KEY, faceUpPilesReducer),
          EffectsModule.forFeature([FaceUpPilesEffects]),
        ],
        providers: [FaceUpPilesFacade],
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
      facade = TestBed.get(FaceUpPilesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allFaceUpPiles$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allFaceUpPiles$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadFaceUpPilesSuccess` to manually update list
     */
    it('allFaceUpPiles$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allFaceUpPiles$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          FaceUpPilesActions.loadFaceUpPilesSuccess({
            agglomerationCards: [
              createAgglomerationCardsEntity(
                'AAA',
                new Map([
                  [ResourceType.Wood, 1],
                  [ResourceType.Clay, 2],
                ]),
                AgglomerationType.Road
              ),
              createAgglomerationCardsEntity(
                'BBB',
                new Map([
                  [ResourceType.Wood, 1],
                  [ResourceType.Clay, 1],
                  [ResourceType.Wool, 1],
                  [ResourceType.Wheat, 1],
                ]),
                AgglomerationType.Hamlet,
                1
              ),
            ],
          })
        );

        list = await readFirst(facade.allFaceUpPiles$);
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
