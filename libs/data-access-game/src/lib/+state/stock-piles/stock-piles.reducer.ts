import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StockPilesActions from './stock-piles.actions';
import { StockPilesEntity } from './stock-piles.models';

export const STOCK_PILES_FEATURE_KEY = 'stockPiles';

export interface StockPilesState extends EntityState<StockPilesEntity> {
  selectedId?: string; // which StockPiles record has been selected
  initialized: boolean;
  loaded: boolean; // has the StockPiles list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface StockPilesPartialState {
  readonly [STOCK_PILES_FEATURE_KEY]: StockPilesState;
}

export const stockPilesAdapter: EntityAdapter<StockPilesEntity> = createEntityAdapter<StockPilesEntity>();

export const initialStockPilesState: StockPilesState = stockPilesAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const stockPilesReducer = createReducer(
  initialStockPilesState,
  on(StockPilesActions.initStockPilesNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(StockPilesActions.initStockPilesSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(StockPilesActions.loadStockPilesSuccess, (state, { stockPiles }) =>
    stockPilesAdapter.setAll(stockPiles, { ...state, loaded: true })
  ),
  on(StockPilesActions.loadStockPilesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(StockPilesActions.setStockPilesInitialized, (state, { stockPiles }) =>
    stockPilesAdapter.setAll(stockPiles, { ...state, initialized: true })
  )
);
