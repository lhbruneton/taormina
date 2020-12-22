import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LANDS_PILE_FEATURE_KEY,
  LandsPileState,
  LandsPilePartialState,
  landsPileAdapter,
} from './lands-pile.reducer';

// Lookup the 'LandsPile' feature state managed by NgRx
export const getLandsPileState = createFeatureSelector<
  LandsPilePartialState,
  LandsPileState
>(LANDS_PILE_FEATURE_KEY);

const { selectAll, selectEntities } = landsPileAdapter.getSelectors();

export const getLandsPileLoaded = createSelector(
  getLandsPileState,
  (state: LandsPileState) => state.loaded
);

export const getLandsPileError = createSelector(
  getLandsPileState,
  (state: LandsPileState) => state.error
);

export const getAllLandsPile = createSelector(
  getLandsPileState,
  (state: LandsPileState) => selectAll(state)
);

export const getLandsPileEntities = createSelector(
  getLandsPileState,
  (state: LandsPileState) => selectEntities(state)
);

export const getLandsPileSelectedId = createSelector(
  getLandsPileState,
  (state: LandsPileState) => state.selectedId
);

export const getLandsPileSelected = createSelector(
  getLandsPileEntities,
  getLandsPileSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
