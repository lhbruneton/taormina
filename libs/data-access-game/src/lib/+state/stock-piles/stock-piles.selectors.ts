import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  STOCK_PILES_FEATURE_KEY,
  State,
  StockPilesPartialState,
  stockPilesAdapter,
} from './stock-piles.reducer';

// Lookup the 'StockPiles' feature state managed by NgRx
export const getStockPilesState = createFeatureSelector<
  StockPilesPartialState,
  State
>(STOCKPILES_FEATURE_KEY);

const { selectAll, selectEntities } = stockPilesAdapter.getSelectors();

export const getStockPilesLoaded = createSelector(
  getStockPilesState,
  (state: State) => state.loaded
);

export const getStockPilesError = createSelector(
  getStockPilesState,
  (state: State) => state.error
);

export const getAllStockPiles = createSelector(
  getStockPilesState,
  (state: State) => selectAll(state)
);

export const getStockPilesEntities = createSelector(
  getStockPilesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getStockPilesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getStockPilesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
