import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockPilesCardsEntity } from './stock-piles-cards.models';
import {
  STOCK_PILES_CARDS_FEATURE_KEY,
  StockPilesCardsState,
  stockPilesCardsAdapter,
} from './stock-piles-cards.reducer';

// Lookup the 'StockPilesCards' feature state managed by NgRx
export const getStockPilesCardsState =
  createFeatureSelector<StockPilesCardsState>(STOCK_PILES_CARDS_FEATURE_KEY);

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStockPileCardEntityByPivot = (
  pileId: string,
  cardType: string,
  cardId: string
) =>
  createSelector(getAllStockPilesCards, (entities: StockPilesCardsEntity[]) =>
    entities.find(
      (entity) =>
        entity.pileId === pileId &&
        entity.cardType === cardType &&
        entity.cardId === cardId
    )
  );
