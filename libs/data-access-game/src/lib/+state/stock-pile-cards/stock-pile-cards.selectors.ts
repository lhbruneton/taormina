import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  STOCK_PILE_CARDS_FEATURE_KEY,
  StockPileCardsState,
  StockPileCardsPartialState,
  stockPileCardsAdapter,
} from './stock-pile-cards.reducer';

// Lookup the 'StockPileCards' feature state managed by NgRx
export const getStockPileCardsState = createFeatureSelector<
  StockPileCardsPartialState,
  StockPileCardsState
>(STOCK_PILE_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = stockPileCardsAdapter.getSelectors();

export const getStockPileCardsLoaded = createSelector(
  getStockPileCardsState,
  (state: StockPileCardsState) => state.loaded
);

export const getStockPileCardsError = createSelector(
  getStockPileCardsState,
  (state: StockPileCardsState) => state.error
);

export const getAllStockPileCards = createSelector(
  getStockPileCardsState,
  (state: StockPileCardsState) => selectAll(state)
);

export const getStockPileCardsEntities = createSelector(
  getStockPileCardsState,
  (state: StockPileCardsState) => selectEntities(state)
);

export const getStockPileCardsSelectedId = createSelector(
  getStockPileCardsState,
  (state: StockPileCardsState) => state.selectedId
);

export const getStockPileCardsSelected = createSelector(
  getStockPileCardsEntities,
  getStockPileCardsSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);