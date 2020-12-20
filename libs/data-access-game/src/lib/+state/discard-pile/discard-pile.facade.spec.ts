import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DiscardPileEntity } from './discard-pile.models';
import { DiscardPileEffects } from './discard-pile.effects';
import { DiscardPileFacade } from './discard-pile.facade';

import * as DiscardPileSelectors from './discard-pile.selectors';
import * as DiscardPileActions from './discard-pile.actions';
import {
  DISCARD_PILE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './discard-pile.reducer';

interface TestSchema {
  discardPile: State;
}

describe('DiscardPileFacade', () => {
  let facade: DiscardPileFacade;
  let store: Store<TestSchema>;
  const createDiscardPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiscardPileEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DISCARD_PILE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([DiscardPileEffects]),
        ],
        providers: [DiscardPileFacade],
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
      facade = TestBed.get(DiscardPileFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDiscardPile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allDiscardPile$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDiscardPileSuccess` to manually update list
     */
    it('allDiscardPile$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDiscardPile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DiscardPileActions.loadDiscardPileSuccess({
            discardPile: [
              createDiscardPileEntity('AAA'),
              createDiscardPileEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allDiscardPile$);
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
