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
  props<{ error: unknown }>()
);

export const setStockPileCardsInitialized = createAction(
  '[StockPileCards] Set StockPileCards On Init',
  props<{ stockPileCards: StockPileCardsEntity[] }>()
);

export const removeCardsFromStockPile = createAction(
  '[StockPileCards] Remove Cards From Stock Pile',
  props<{ stockPileId: string; cardIds: string[] }>()
);

export const removeStockPileCards = createAction(
  '[StockPileCards] Remove StockPileCards',
  props<{ stockPileCardIds: string[] }>()
);
