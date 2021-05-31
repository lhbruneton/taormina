import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import { StockPilesCardsEntity } from './stock-piles-cards.models';

export const STOCK_PILES_CARDS_FEATURE_KEY = 'stockPilesCards';

export interface StockPilesCardsState
  extends EntityState<StockPilesCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
}

export interface StockPilesCardsPartialState {
  readonly [STOCK_PILES_CARDS_FEATURE_KEY]: StockPilesCardsState;
}

// eslint-disable-next-line max-len
export const stockPilesCardsAdapter: EntityAdapter<StockPilesCardsEntity> = createEntityAdapter<StockPilesCardsEntity>();

export const initialStockPilesCardsState: StockPilesCardsState = stockPilesCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const stockPilesCardsReducer = createReducer(
  initialStockPilesCardsState,
  on(StockPilesCardsActions.initStockPilesCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(StockPilesCardsActions.initStockPilesCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    errorMsg: undefined,
  })),
  on(
    StockPilesCardsActions.loadStockPilesCardsSuccess,
    (state, { stockPilesCards }) =>
      stockPilesCardsAdapter.setAll(stockPilesCards, { ...state, loaded: true })
  ),
  on(StockPilesCardsActions.loadStockPilesCardsFailure, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(
    StockPilesCardsActions.setStockPilesCardsInitialized,
    (state, { stockPilesCards }) =>
      stockPilesCardsAdapter.setAll(stockPilesCards, {
        ...state,
        initialized: true,
      })
  ),
  on(StockPilesCardsActions.removeStockPilesCards, (state, { ids }) =>
    stockPilesCardsAdapter.removeMany(ids, state)
  ),
  on(StockPilesCardsActions.addStockPilesCards, (state, { stockPilesCards }) =>
    stockPilesCardsAdapter.addMany(stockPilesCards, state)
  ),
  on(StockPilesCardsActions.setStockPilesCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  }))
);
