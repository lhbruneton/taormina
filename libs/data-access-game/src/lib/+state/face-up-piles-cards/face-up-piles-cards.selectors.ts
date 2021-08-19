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
  FaceUpPilesCardsState
>(FACE_UP_PILES_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = faceUpPilesCardsAdapter.getSelectors();

export const getFaceUpPilesCardsLoaded = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => state.loaded
);

export const getFaceUpPilesCardsError = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpPilesCardsState) => state.errorMsg
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getFaceUpPileCardEntityByPivot = (
  pileId: string,
  cardId: string
) =>
  createSelector(getAllFaceUpPilesCards, (entities: FaceUpPilesCardsEntity[]) =>
    entities.find(
      (entity) => entity.pileId === pileId && entity.cardId === cardId
    )
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCardPivotsForPile = (pileId: string) =>
  createSelector(getAllFaceUpPilesCards, (entities: FaceUpPilesCardsEntity[]) =>
    entities.filter((pivot) => pivot.pileId === pileId)
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getFirstCardPivotForPile = (pileId: string) =>
  createSelector(getAllFaceUpPilesCards, (entities: FaceUpPilesCardsEntity[]) =>
    entities.find((pivot) => pivot.pileId === pileId)
  );
