import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StockPileCardsActions from './stock-pile-cards.actions';
import { StockPileCardsEntity } from './stock-pile-cards.models';

export const STOCK_PILE_CARDS_FEATURE_KEY = 'stockPileCards';

export interface StockPileCardsState extends EntityState<StockPileCardsEntity> {
  selectedId?: string | number; // which StockPileCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the StockPileCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface StockPileCardsPartialState {
  readonly [STOCK_PILE_CARDS_FEATURE_KEY]: StockPileCardsState;
}

export const stockPileCardsAdapter: EntityAdapter<StockPileCardsEntity> = createEntityAdapter<
  StockPileCardsEntity
>();

export const initialStockPileCardsState: StockPileCardsState = stockPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const stockPileCardsReducer = createReducer(
  initialStockPileCardsState,
  on(StockPileCardsActions.initStockPileCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(StockPileCardsActions.initStockPileCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    StockPileCardsActions.loadStockPileCardsSuccess,
    (state, { stockPileCards }) =>
      stockPileCardsAdapter.setAll(stockPileCards, { ...state, loaded: true })
  ),
  on(StockPileCardsActions.loadStockPileCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    StockPileCardsActions.setStockPileCardsInitialized,
    (state, { stockPileCards }) =>
      stockPileCardsAdapter.setAll(stockPileCards, {
        ...state,
        initialized: true,
      })
  ),
  on(
    StockPileCardsActions.removeStockPileCards,
    (state, { stockPileCardIds }) =>
      stockPileCardsAdapter.removeMany(stockPileCardIds, state)
  )
);
