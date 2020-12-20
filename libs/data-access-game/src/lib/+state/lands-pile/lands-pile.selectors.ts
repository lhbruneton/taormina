import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LANDS_PILE_FEATURE_KEY,
  State,
  LandsPilePartialState,
  landsPileAdapter,
} from './lands-pile.reducer';

// Lookup the 'LandsPile' feature state managed by NgRx
export const getLandsPileState = createFeatureSelector<
  LandsPilePartialState,
  State
>(LANDSPILE_FEATURE_KEY);

const { selectAll, selectEntities } = landsPileAdapter.getSelectors();

export const getLandsPileLoaded = createSelector(
  getLandsPileState,
  (state: State) => state.loaded
);

export const getLandsPileError = createSelector(
  getLandsPileState,
  (state: State) => state.error
);

export const getAllLandsPile = createSelector(
  getLandsPileState,
  (state: State) => selectAll(state)
);

export const getLandsPileEntities = createSelector(
  getLandsPileState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getLandsPileState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getLandsPileEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
