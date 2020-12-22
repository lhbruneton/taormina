import { createAction, props } from '@ngrx/store';
import { StockPilesEntity } from './stock-piles.models';

export const initStockPiles = createAction('[StockPiles Page] Init');

export const loadStockPilesSuccess = createAction(
  '[StockPiles/API] Load StockPiles Success',
  props<{ stockPiles: StockPilesEntity[] }>()
);

export const loadStockPilesFailure = createAction(
  '[StockPiles/API] Load StockPiles Failure',
  props<{ error: any }>()
);
