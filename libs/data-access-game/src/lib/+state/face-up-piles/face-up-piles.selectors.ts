import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  FACE_UP_PILES_FEATURE_KEY,
  State,
  FaceUpPilesPartialState,
  faceUpPilesAdapter,
} from './face-up-piles.reducer';

// Lookup the 'FaceUpPiles' feature state managed by NgRx
export const getFaceUpPilesState = createFeatureSelector<
  FaceUpPilesPartialState,
  State
>(FACEUPPILES_FEATURE_KEY);

const { selectAll, selectEntities } = faceUpPilesAdapter.getSelectors();

export const getFaceUpPilesLoaded = createSelector(
  getFaceUpPilesState,
  (state: State) => state.loaded
);

export const getFaceUpPilesError = createSelector(
  getFaceUpPilesState,
  (state: State) => state.error
);

export const getAllFaceUpPiles = createSelector(
  getFaceUpPilesState,
  (state: State) => selectAll(state)
);

export const getFaceUpPilesEntities = createSelector(
  getFaceUpPilesState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getFaceUpPilesState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getFaceUpPilesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
