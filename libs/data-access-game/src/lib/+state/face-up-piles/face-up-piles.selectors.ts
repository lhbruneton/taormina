import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FACE_UP_PILES_FEATURE_KEY,
  FaceUpState,
  FaceUpPilesPartialState,
  faceUpPilesAdapter,
} from './face-up-piles.reducer';

// Lookup the 'FaceUpPiles' feature state managed by NgRx
export const getFaceUpPilesState = createFeatureSelector<
  FaceUpPilesPartialState,
  FaceUpState
>(FACE_UP_PILES_FEATURE_KEY);

const { selectAll, selectEntities } = faceUpPilesAdapter.getSelectors();

export const getFaceUpPilesLoaded = createSelector(
  getFaceUpPilesState,
  (state: FaceUpState) => state.loaded
);

export const getFaceUpPilesError = createSelector(
  getFaceUpPilesState,
  (state: FaceUpState) => state.error
);

export const getAllFaceUpPiles = createSelector(
  getFaceUpPilesState,
  (state: FaceUpState) => selectAll(state)
);

export const getFaceUpPilesEntities = createSelector(
  getFaceUpPilesState,
  (state: FaceUpState) => selectEntities(state)
);

export const getFaceUpSelectedId = createSelector(
  getFaceUpPilesState,
  (state: FaceUpState) => state.selectedId
);

export const getFaceUpSelected = createSelector(
  getFaceUpPilesEntities,
  getFaceUpSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
