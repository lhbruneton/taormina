/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { firstValueFrom } from 'rxjs';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import { StockPilesCardsEffects } from './stock-piles-cards.effects';
import { StockPilesCardsFacade } from './stock-piles-cards.facade';
import { createStockPilesCardsEntity } from './stock-piles-cards.models';
import {
  stockPilesCardsReducer,
  StockPilesCardsState,
  STOCK_PILES_CARDS_FEATURE_KEY,
} from './stock-piles-cards.reducer';

interface TestSchema {
  stockPilesCards: StockPilesCardsState;
}

describe('StockPilesCardsFacade', () => {
  let facade: StockPilesCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            STOCK_PILES_CARDS_FEATURE_KEY,
            stockPilesCardsReducer
          ),
          EffectsModule.forFeature([StockPilesCardsEffects]),
        ],
        providers: [StockPilesCardsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(StockPilesCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allStockPilesCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.initSavedGame();

      list = await firstValueFrom(facade.allStockPilesCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadStockPilesCardsSuccess` to manually update list
     */
    it('allStockPilesCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allStockPilesCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        StockPilesCardsActions.loadStockPilesCardsSuccess({
          stockPilesCards: [
            createStockPilesCardsEntity(
              'AAA',
              'A',
              ACTION_CARD_INTERFACE_NAME,
              'A'
            ),
            createStockPilesCardsEntity(
              'BBB',
              'B',
              DEVELOPMENT_CARD_INTERFACE_NAME,
              'B'
            ),
          ],
        })
      );

      list = await firstValueFrom(facade.allStockPilesCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
