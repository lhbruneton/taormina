import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { FaceUpPilesEntity } from './face-up-piles.models';
import { FaceUpPilesEffects } from './face-up-piles.effects';
import { FaceUpPilesFacade } from './face-up-piles.facade';

import * as FaceUpPilesSelectors from './face-up-piles.selectors';
import * as FaceUpPilesActions from './face-up-piles.actions';
import {
  FACE_UP_PILES_FEATURE_KEY,
  FaceUpState,
  initialFaceUpState,
  faceUpPilesReducer,
} from './face-up-piles.reducer';

interface TestSchema {
  faceUpPiles: FaceUpState;
}

describe('FaceUpPilesFacade', () => {
  let facade: FaceUpPilesFacade;
  let store: Store<TestSchema>;
  const createFaceUpPilesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FaceUpPilesEntity);

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

        facade.init();

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
            faceUpPiles: [
              createFaceUpPilesEntity('AAA'),
              createFaceUpPilesEntity('BBB'),
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
