import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import { StockPilesCardsEntity } from './stock-piles-cards.models';

export const STOCK_PILES_CARDS_FEATURE_KEY = 'stockPilesCards';

export interface StockPilesCardsState
  extends EntityState<StockPilesCardsEntity> {
  selectedId?: string; // which StockPilesCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the StockPilesCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface StockPilesCardsPartialState {
  readonly [STOCK_PILES_CARDS_FEATURE_KEY]: StockPilesCardsState;
}

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
    error: null,
  })),
  on(
    StockPilesCardsActions.loadStockPilesCardsSuccess,
    (state, { stockPilesCards }) =>
      stockPilesCardsAdapter.setAll(stockPilesCards, { ...state, loaded: true })
  ),
  on(StockPilesCardsActions.loadStockPilesCardsFailure, (state, { error }) => ({
    ...state,
    error,
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
  )
);
