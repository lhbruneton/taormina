import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENTS_PILE_FEATURE_KEY,
  EventsPileState,
  EventsPilePartialState,
  eventsPileAdapter,
} from './events-pile.reducer';

// Lookup the 'EventsPile' feature state managed by NgRx
export const getEventsPileState = createFeatureSelector<
  EventsPilePartialState,
  EventsPileState
>(EVENTS_PILE_FEATURE_KEY);

const { selectAll, selectEntities } = eventsPileAdapter.getSelectors();

export const getEventsPileLoaded = createSelector(
  getEventsPileState,
  (state: EventsPileState) => state.loaded
);

export const getEventsPileError = createSelector(
  getEventsPileState,
  (state: EventsPileState) => state.error
);

export const getAllEventsPile = createSelector(
  getEventsPileState,
  (state: EventsPileState) => selectAll(state)
);

export const getEventsPileEntities = createSelector(
  getEventsPileState,
  (state: EventsPileState) => selectEntities(state)
);

export const getEventsPileSelectedId = createSelector(
  getEventsPileState,
  (state: EventsPileState) => state.selectedId
);

export const getEventsPileSelected = createSelector(
  getEventsPileEntities,
  getEventsPileSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
