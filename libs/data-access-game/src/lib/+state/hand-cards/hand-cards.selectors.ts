import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HAND_CARDS_FEATURE_KEY,
  HandCardsState,
  HandCardsPartialState,
  handCardsAdapter,
} from './hand-cards.reducer';

// Lookup the 'HandCards' feature state managed by NgRx
export const getHandCardsState = createFeatureSelector<
  HandCardsPartialState,
  HandCardsState
>(HAND_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = handCardsAdapter.getSelectors();

export const getHandCardsLoaded = createSelector(
  getHandCardsState,
  (state: HandCardsState) => state.loaded
);

export const getHandCardsError = createSelector(
  getHandCardsState,
  (state: HandCardsState) => state.error
);

export const getAllHandCards = createSelector(
  getHandCardsState,
  (state: HandCardsState) => selectAll(state)
);

export const getHandCardsEntities = createSelector(
  getHandCardsState,
  (state: HandCardsState) => selectEntities(state)
);

export const getHandCardsSelectedId = createSelector(
  getHandCardsState,
  (state: HandCardsState) => state.selectedId
);

export const getHandCardsSelected = createSelector(
  getHandCardsEntities,
  getHandCardsSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
