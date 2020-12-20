import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { LandsPileEntity } from './lands-pile.models';
import { LandsPileEffects } from './lands-pile.effects';
import { LandsPileFacade } from './lands-pile.facade';

import * as LandsPileSelectors from './lands-pile.selectors';
import * as LandsPileActions from './lands-pile.actions';
import {
  LANDS_PILE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './lands-pile.reducer';

interface TestSchema {
  landsPile: State;
}

describe('LandsPileFacade', () => {
  let facade: LandsPileFacade;
  let store: Store<TestSchema>;
  const createLandsPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LandsPileEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(LANDS_PILE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([LandsPileEffects]),
        ],
        providers: [LandsPileFacade],
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
      facade = TestBed.get(LandsPileFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allLandsPile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allLandsPile$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadLandsPileSuccess` to manually update list
     */
    it('allLandsPile$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allLandsPile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          LandsPileActions.loadLandsPileSuccess({
            landsPile: [
              createLandsPileEntity('AAA'),
              createLandsPileEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allLandsPile$);
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
