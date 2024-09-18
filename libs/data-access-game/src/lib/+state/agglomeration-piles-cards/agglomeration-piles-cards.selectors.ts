import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AgglomerationPilesCardsEntity } from './agglomeration-piles-cards.models';
import {
  agglomerationPilesCardsAdapter,
  AgglomerationPilesCardsState,
  AGGLOMERATION_PILES_CARDS_FEATURE_KEY,
} from './agglomeration-piles-cards.reducer';

// Lookup the 'AgglomerationPilesCards' feature state managed by NgRx
export const getAgglomerationPilesCardsState =
  createFeatureSelector<AgglomerationPilesCardsState>(
    AGGLOMERATION_PILES_CARDS_FEATURE_KEY
  );

const { selectAll, selectEntities } =
  agglomerationPilesCardsAdapter.getSelectors();

export const getAgglomerationPilesCardsLoaded = createSelector(
  getAgglomerationPilesCardsState,
  (state: AgglomerationPilesCardsState) => state.loaded
);

export const getAgglomerationPilesCardsError = createSelector(
  getAgglomerationPilesCardsState,
  (state: AgglomerationPilesCardsState) => state.errorMsg
);

export const getAllAgglomerationPilesCards = createSelector(
  getAgglomerationPilesCardsState,
  (state: AgglomerationPilesCardsState) => selectAll(state)
);

export const getAgglomerationPilesCardsEntities = createSelector(
  getAgglomerationPilesCardsState,
  (state: AgglomerationPilesCardsState) => selectEntities(state)
);

export const getAgglomerationSelectedId = createSelector(
  getAgglomerationPilesCardsState,
  (state: AgglomerationPilesCardsState) => state.selectedId
);

export const getAgglomerationSelected = createSelector(
  getAgglomerationPilesCardsEntities,
  getAgglomerationSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);

export const getAgglomerationPileCardEntityByPivot = (
  pileId: string,
  cardId: string
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) =>
  createSelector(
    getAllAgglomerationPilesCards,
    (entities: AgglomerationPilesCardsEntity[]) =>
      entities.find(
        (entity) => entity.pileId === pileId && entity.cardId === cardId
      )
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCardPivotsForPile = (pileId: string) =>
  createSelector(
    getAllAgglomerationPilesCards,
    (entities: AgglomerationPilesCardsEntity[]) =>
      entities.filter((pivot) => pivot.pileId === pileId)
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getFirstCardPivotForPile = (pileId: string) =>
  createSelector(
    getAllAgglomerationPilesCards,
    (entities: AgglomerationPilesCardsEntity[]) =>
      entities.find((pivot) => pivot.pileId === pileId)
  );
