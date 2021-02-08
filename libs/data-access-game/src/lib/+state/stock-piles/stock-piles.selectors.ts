import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  STOCK_PILES_FEATURE_KEY,
  StockPilesState,
  StockPilesPartialState,
  stockPilesAdapter,
} from './stock-piles.reducer';

// Lookup the 'StockPiles' feature state managed by NgRx
export const getStockPilesState = createFeatureSelector<
  StockPilesPartialState,
  StockPilesState
>(STOCK_PILES_FEATURE_KEY);

const { selectAll, selectEntities } = stockPilesAdapter.getSelectors();

export const getStockPilesLoaded = createSelector(
  getStockPilesState,
  (state: StockPilesState) => state.loaded
);

export const getStockPilesError = createSelector(
  getStockPilesState,
  (state: StockPilesState) => state.error
);

export const getAllStockPiles = createSelector(
  getStockPilesState,
  (state: StockPilesState) => selectAll(state)
);

export const getStockPilesEntities = createSelector(
  getStockPilesState,
  (state: StockPilesState) => selectEntities(state)
);

export const getStockPilesSelectedId = createSelector(
  getStockPilesState,
  (state: StockPilesState) => state.selectedId
);

export const getStockPilesSelected = createSelector(
  getStockPilesEntities,
  getStockPilesSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
