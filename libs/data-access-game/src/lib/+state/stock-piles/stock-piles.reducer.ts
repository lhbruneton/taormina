import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as StockPilesActions from './stock-piles.actions';
import { StockPilesEntity } from './stock-piles.models';

export const STOCK_PILES_FEATURE_KEY = 'stockPiles';

export interface State extends EntityState<StockPilesEntity> {
  selectedId?: string | number; // which StockPiles record has been selected
  loaded: boolean; // has the StockPiles list been loaded
  error?: string | null; // last known error (if any)
}

export interface StockPilesPartialState {
  readonly [STOCK_PILES_FEATURE_KEY]: State;
}

export const stockPilesAdapter: EntityAdapter<StockPilesEntity> = createEntityAdapter<
  StockPilesEntity
>();

export const initialState: State = stockPilesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const stockPilesReducer = createReducer(
  initialState,
  on(StockPilesActions.init, (state) => ({
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
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return stockPilesReducer(state, action);
}
