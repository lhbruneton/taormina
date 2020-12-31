import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { StockPileCardsEntity } from './stock-pile-cards.models';
import { StockPileCardsEffects } from './stock-pile-cards.effects';
import { StockPileCardsFacade } from './stock-pile-cards.facade';

import * as StockPileCardsSelectors from './stock-pile-cards.selectors';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import {
  STOCK_PILE_CARDS_FEATURE_KEY,
  StockPileCardsState,
  initialStockPileCardsState,
  stockPileCardsReducer,
} from './stock-pile-cards.reducer';

interface TestSchema {
  stockPileCards: StockPileCardsState;
}

describe('StockPileCardsFacade', () => {
  let facade: StockPileCardsFacade;
  let store: Store<TestSchema>;
  const createStockPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StockPileCardsEntity);

  beforeEach(() => {});

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

        facade.init();

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
              createStockPileCardsEntity('AAA'),
              createStockPileCardsEntity('BBB'),
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
