import { createAction, props } from '@ngrx/store';
import { StockPileCardsEntity } from './stock-pile-cards.models';

export const initStockPileCards = createAction('[StockPileCards Page] Init');

export const loadStockPileCardsSuccess = createAction(
  '[StockPileCards/API] Load StockPileCards Success',
  props<{ stockPileCards: StockPileCardsEntity[] }>()
);

export const loadStockPileCardsFailure = createAction(
  '[StockPileCards/API] Load StockPileCards Failure',
  props<{ error: any }>()
);
