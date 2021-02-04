import { createStockPilesEntity } from './stock-piles.models';
import * as StockPilesActions from './stock-piles.actions';
import {
  StockPilesState,
  initialStockPilesState,
  stockPilesReducer,
} from './stock-piles.reducer';
import { Action } from '@ngrx/store';

describe('StockPiles Reducer', () => {
  describe('valid StockPiles actions', () => {
    it('loadStockPilesSuccess should return set the list of known StockPiles', () => {
      const stockPiles = [
        createStockPilesEntity('PRODUCT-AAA'),
        createStockPilesEntity('PRODUCT-zzz'),
      ];
      const action = StockPilesActions.loadStockPilesSuccess({ stockPiles });

      const result: StockPilesState = stockPilesReducer(
        initialStockPilesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = stockPilesReducer(initialStockPilesState, action);

      expect(result).toBe(initialStockPilesState);
    });
  });
});
