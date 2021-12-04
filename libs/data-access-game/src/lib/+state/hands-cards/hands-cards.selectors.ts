import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  HANDS_CARDS_FEATURE_KEY,
  HandsCardsState,
  HandsCardsPartialState,
  handsCardsAdapter,
} from './hands-cards.reducer';

// Lookup the 'HandsCards' feature state managed by NgRx
export const getHandsCardsState = createFeatureSelector<
  HandsCardsState
>(HANDS_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = handsCardsAdapter.getSelectors();

export const getHandsCardsLoaded = createSelector(
  getHandsCardsState,
  (state: HandsCardsState) => state.loaded
);

export const getHandsCardsError = createSelector(
  getHandsCardsState,
  (state: HandsCardsState) => state.errorMsg
);

export const getAllHandsCards = createSelector(
  getHandsCardsState,
  (state: HandsCardsState) => selectAll(state)
);

export const getHandsCardsEntities = createSelector(
  getHandsCardsState,
  (state: HandsCardsState) => selectEntities(state)
);

export const getHandsCardsSelectedId = createSelector(
  getHandsCardsState,
  (state: HandsCardsState) => state.selectedId
);

export const getHandsCardsSelected = createSelector(
  getHandsCardsEntities,
  getHandsCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
