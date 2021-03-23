import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockPilesCardsEntity } from './stock-piles-cards.models';
import {
  STOCK_PILES_CARDS_FEATURE_KEY,
  StockPilesCardsState,
  StockPilesCardsPartialState,
  stockPilesCardsAdapter,
} from './stock-piles-cards.reducer';

// Lookup the 'StockPilesCards' feature state managed by NgRx
export const getStockPilesCardsState = createFeatureSelector<
  StockPilesCardsPartialState,
  StockPilesCardsState
>(STOCK_PILES_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = stockPilesCardsAdapter.getSelectors();

export const getStockPilesCardsLoaded = createSelector(
  getStockPilesCardsState,
  (state: StockPilesCardsState) => state.loaded
);

export const getStockPilesCardsError = createSelector(
  getStockPilesCardsState,
  (state: StockPilesCardsState) => state.errorMsg
);

export const getAllStockPilesCards = createSelector(
  getStockPilesCardsState,
  (state: StockPilesCardsState) => selectAll(state)
);

export const getStockPilesCardsEntities = createSelector(
  getStockPilesCardsState,
  (state: StockPilesCardsState) => selectEntities(state)
);

export const getStockPilesCardsSelectedId = createSelector(
  getStockPilesCardsState,
  (state: StockPilesCardsState) => state.selectedId
);

export const getStockPilesCardsSelected = createSelector(
  getStockPilesCardsEntities,
  getStockPilesCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);

export const getStockPileCardEntityByPivot = createSelector(
  getAllStockPilesCards,
  (
    entities: StockPilesCardsEntity[],
    props: { pileId: string; cardType: string; cardId: string }
  ) =>
    entities.find(
      (entity) =>
        entity.pileId === props.pileId &&
        entity.cardType === props.cardType &&
        entity.cardId === props.cardId
    )
);
