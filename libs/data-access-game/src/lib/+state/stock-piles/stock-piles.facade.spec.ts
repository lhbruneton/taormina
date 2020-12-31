import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { StockPilesEntity } from './stock-piles.models';
import { StockPilesEffects } from './stock-piles.effects';
import { StockPilesFacade } from './stock-piles.facade';

import * as StockPilesSelectors from './stock-piles.selectors';
import * as StockPilesActions from './stock-piles.actions';
import {
  STOCK_PILES_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './stock-piles.reducer';

interface TestSchema {
  stockPiles: State;
}

describe('StockPilesFacade', () => {
  let facade: StockPilesFacade;
  let store: Store<TestSchema>;
  const createStockPilesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StockPilesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(STOCK_PILES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([StockPilesEffects]),
        ],
        providers: [StockPilesFacade],
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
      facade = TestBed.get(StockPilesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allStockPiles$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allStockPiles$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadStockPilesSuccess` to manually update list
     */
    it('allStockPiles$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allStockPiles$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          StockPilesActions.loadStockPilesSuccess({
            stockPiles: [
              createStockPilesEntity('AAA'),
              createStockPilesEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allStockPiles$);
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