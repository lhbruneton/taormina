import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { DomainColor } from '@taormina/shared-models';

import * as HandsActions from './hands.actions';
import { HandsEffects } from './hands.effects';
import { HandsFacade } from './hands.facade';
import { createHandsEntity } from './hands.models';
import { handsReducer, HandsState, HANDS_FEATURE_KEY } from './hands.reducer';

interface TestSchema {
  hands: HandsState;
}

describe('HandsFacade', () => {
  let facade: HandsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HANDS_FEATURE_KEY, handsReducer),
          EffectsModule.forFeature([HandsEffects]),
        ],
        providers: [HandsFacade],
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
      facade = TestBed.get(HandsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allHands$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allHands$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadHandsSuccess` to manually update list
     */
    it('allHands$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allHands$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          HandsActions.loadHandsSuccess({
            hands: [
              createHandsEntity('AAA', DomainColor.Red),
              createHandsEntity('BBB', DomainColor.Blue),
            ],
          })
        );

        list = await readFirst(facade.allHands$);
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
