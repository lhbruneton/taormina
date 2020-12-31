import { createAction, props } from '@ngrx/store';
import { StockPileCardsEntity } from './stock-pile-cards.models';

export const initStockPileCardsNewGame = createAction(
  '[Start Page] Init StockPileCards New Game'
);

export const initStockPileCardsSavedGame = createAction(
  '[Start Page] Init StockPileCards Saved Game'
);

export const loadStockPileCardsSuccess = createAction(
  '[StockPileCards/API] Load StockPileCards Success',
  props<{ stockPileCards: StockPileCardsEntity[] }>()
);

export const loadStockPileCardsFailure = createAction(
  '[StockPileCards/API] Load StockPileCards Failure',
  props<{ error: any }>()
);

export const setStockPileCardsInitialized = createAction(
  '[StockPileCards] Set StockPileCards On Init',
  props<{ stockPileCards: StockPileCardsEntity[] }>()
);
