import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  EVENTS_PILE_CARDS_FEATURE_KEY,
  EventsPileCardsState,
  EventsPileCardsPartialState,
  eventsPileCardsAdapter,
} from './events-pile-cards.reducer';

// Lookup the 'EventsPileCards' feature state managed by NgRx
export const getEventsPileCardsState = createFeatureSelector<
  EventsPileCardsState
>(EVENTS_PILE_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = eventsPileCardsAdapter.getSelectors();

export const getEventsPileCardsLoaded = createSelector(
  getEventsPileCardsState,
  (state: EventsPileCardsState) => state.loaded
);

export const getEventsPileCardsError = createSelector(
  getEventsPileCardsState,
  (state: EventsPileCardsState) => state.errorMsg
);

export const getAllEventsPileCards = createSelector(
  getEventsPileCardsState,
  (state: EventsPileCardsState) => selectAll(state)
);

export const getEventsPileCardsEntities = createSelector(
  getEventsPileCardsState,
  (state: EventsPileCardsState) => selectEntities(state)
);

export const getEventsPileCardsSelectedId = createSelector(
  getEventsPileCardsState,
  (state: EventsPileCardsState) => state.selectedId
);

export const getEventsPileCardsSelected = createSelector(
  getEventsPileCardsEntities,
  getEventsPileCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
