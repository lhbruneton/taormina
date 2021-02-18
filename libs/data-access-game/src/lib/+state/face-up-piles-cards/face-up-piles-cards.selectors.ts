import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FACE_UP_PILES_CARDS_FEATURE_KEY,
  FaceUpState,
  FaceUpPilesCardsPartialState,
  faceUpPilesCardsAdapter,
} from './face-up-piles-cards.reducer';

// Lookup the 'FaceUpPilesCards' feature state managed by NgRx
export const getFaceUpPilesCardsState = createFeatureSelector<
  FaceUpPilesCardsPartialState,
  FaceUpState
>(FACE_UP_PILES_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = faceUpPilesCardsAdapter.getSelectors();

export const getFaceUpPilesCardsLoaded = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpState) => state.loaded
);

export const getFaceUpPilesCardsError = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpState) => state.error
);

export const getAllFaceUpPilesCards = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpState) => selectAll(state)
);

export const getFaceUpPilesCardsEntities = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpState) => selectEntities(state)
);

export const getFaceUpSelectedId = createSelector(
  getFaceUpPilesCardsState,
  (state: FaceUpState) => state.selectedId
);

export const getFaceUpSelected = createSelector(
  getFaceUpPilesCardsEntities,
  getFaceUpSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
