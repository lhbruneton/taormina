import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENTS_PILE_FEATURE_KEY,
  State,
  EventsPilePartialState,
  eventsPileAdapter,
} from './events-pile.reducer';

// Lookup the 'EventsPile' feature state managed by NgRx
export const getEventsPileState = createFeatureSelector<
  EventsPilePartialState,
  State
>(EVENTSPILE_FEATURE_KEY);

const { selectAll, selectEntities } = eventsPileAdapter.getSelectors();

export const getEventsPileLoaded = createSelector(
  getEventsPileState,
  (state: State) => state.loaded
);

export const getEventsPileError = createSelector(
  getEventsPileState,
  (state: State) => state.error
);

export const getAllEventsPile = createSelector(
  getEventsPileState,
  (state: State) => selectAll(state)
);

export const getEventsPileEntities = createSelector(
  getEventsPileState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getEventsPileState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getEventsPileEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
