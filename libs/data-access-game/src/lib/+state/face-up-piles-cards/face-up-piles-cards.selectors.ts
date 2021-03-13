import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FaceUpPilesCardsEntity } from './face-up-piles-cards.models';
import {
  faceUpPilesCardsAdapter,
  FaceUpPilesCardsPartialState,
  FaceUpPilesCardsState,
  FACE_UP_PILES_CARDS_FEATURE_KEY,
} from './face-up-piles-cards.reducer';

// Lookup the 'FaceUpPilesCards' feature state managed by NgRx
export const getFaceUpPilesCardsState = createFeatureSelector<
  FaceUpPilesCardsPartialState,
  FaceUpPilesCardsState
>(FACE_UP_PILES_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = faceUpPilesCardsAdapter.getSelectors();

export const getFaceUpPilesCardsLoaded = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => state.loaded
);

export const getFaceUpPilesCardsError = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => state.error
);

export const getAllFaceUpPilesCards = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => selectAll(state)
);

export const getFaceUpPilesCardsEntities = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => selectEntities(state)
);

export const getFaceUpSelectedId = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => state.selectedId
);

export const getFaceUpSelected = createSelector(
  getFaceUpPilesCardsEntities,
  getFaceUpSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);

export const getFaceUpPileCardEntityByPivot = createSelector(
  getAllFaceUpPilesCards,
  (
    entities: FaceUpPilesCardsEntity[],
    props: { pileId: string; cardId: string }
  ) =>
    entities.find(
      (entity) =>
        entity.pileId === props.pileId && entity.cardId === props.cardId
    )
);

export const getCardPivotsForPile = createSelector(
  getAllFaceUpPilesCards,
  (entities: FaceUpPilesCardsEntity[], props: { pileId: string }) =>
    entities.filter((pivot) => pivot.pileId === props.pileId)
);

export const getFirstCardPivotForPile = createSelector(
  getAllFaceUpPilesCards,
  (entities: FaceUpPilesCardsEntity[], props: { pileId: string }) =>
    entities.find((pivot) => pivot.pileId === props.pileId)
);
