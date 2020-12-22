import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HANDS_FEATURE_KEY,
  HandsState,
  HandsPartialState,
  handsAdapter,
} from './hands.reducer';

// Lookup the 'Hands' feature state managed by NgRx
export const getHandsState = createFeatureSelector<
  HandsPartialState,
  HandsState
>(HANDS_FEATURE_KEY);

const { selectAll, selectEntities } = handsAdapter.getSelectors();

export const getHandsLoaded = createSelector(
  getHandsState,
  (state: HandsState) => state.loaded
);

export const getHandsError = createSelector(
  getHandsState,
  (state: HandsState) => state.error
);

export const getAllHands = createSelector(getHandsState, (state: HandsState) =>
  selectAll(state)
);

export const getHandsEntities = createSelector(
  getHandsState,
  (state: HandsState) => selectEntities(state)
);

export const getHandsSelectedId = createSelector(
  getHandsState,
  (state: HandsState) => state.selectedId
);

export const getHandsSelected = createSelector(
  getHandsEntities,
  getHandsSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
