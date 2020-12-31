import { createAction, props } from '@ngrx/store';
import { StockPilesEntity } from './stock-piles.models';

export const initStockPilesNewGame = createAction(
  '[Start Page] Init StockPiles New Game'
);

export const initStockPilesSavedGame = createAction(
  '[Start Page] Init StockPiles Saved Game'
);

export const loadStockPilesSuccess = createAction(
  '[StockPiles/API] Load StockPiles Success',
  props<{ stockPiles: StockPilesEntity[] }>()
);

export const loadStockPilesFailure = createAction(
  '[StockPiles/API] Load StockPiles Failure',
  props<{ error: any }>()
);

export const setStockPilesInitialized = createAction(
  '[StockPiles] Set StockPiles On Init',
  props<{ stockPiles: StockPilesEntity[] }>()
);
