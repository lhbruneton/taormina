import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as StockPileCardsActions from './stock-pile-cards.actions';
import { StockPileCardsEffects } from './stock-pile-cards.effects';
import { StockPileCardsFacade } from './stock-pile-cards.facade';
import { createStockPileCardsEntity } from './stock-pile-cards.models';
import {
  stockPileCardsReducer,
  StockPileCardsState,
  STOCK_PILE_CARDS_FEATURE_KEY,
} from './stock-pile-cards.reducer';

interface TestSchema {
  stockPileCards: StockPileCardsState;
}

describe('StockPileCardsFacade', () => {
  let facade: StockPileCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            STOCK_PILE_CARDS_FEATURE_KEY,
            stockPileCardsReducer
          ),
          EffectsModule.forFeature([StockPileCardsEffects]),
        ],
        providers: [StockPileCardsFacade],
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
      facade = TestBed.get(StockPileCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allStockPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allStockPileCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadStockPileCardsSuccess` to manually update list
     */
    it('allStockPileCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allStockPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          StockPileCardsActions.loadStockPileCardsSuccess({
            stockPileCards: [
              createStockPileCardsEntity('AAA', 'A', 'A'),
              createStockPileCardsEntity('BBB', 'B', 'B'),
            ],
          })
        );

        list = await readFirst(facade.allStockPileCards$);
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
