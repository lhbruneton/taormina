import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HANDS_FEATURE_KEY,
  State,
  HandsPartialState,
  handsAdapter,
} from './hands.reducer';

// Lookup the 'Hands' feature state managed by NgRx
export const getHandsState = createFeatureSelector<HandsPartialState, State>(
  HANDS_FEATURE_KEY
);

const { selectAll, selectEntities } = handsAdapter.getSelectors();

export const getHandsLoaded = createSelector(
  getHandsState,
  (state: State) => state.loaded
);

export const getHandsError = createSelector(
  getHandsState,
  (state: State) => state.error
);

export const getAllHands = createSelector(getHandsState, (state: State) =>
  selectAll(state)
);

export const getHandsEntities = createSelector(getHandsState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getHandsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getHandsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
