import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DISCARD_PILE_FEATURE_KEY,
  DiscardPileState,
  DiscardPilePartialState,
  discardPileAdapter,
} from './discard-pile.reducer';

// Lookup the 'DiscardPile' feature state managed by NgRx
export const getDiscardPileState = createFeatureSelector<
  DiscardPilePartialState,
  DiscardPileState
>(DISCARD_PILE_FEATURE_KEY);

const { selectAll, selectEntities } = discardPileAdapter.getSelectors();

export const getDiscardPileLoaded = createSelector(
  getDiscardPileState,
  (state: DiscardPileState) => state.loaded
);

export const getDiscardPileError = createSelector(
  getDiscardPileState,
  (state: DiscardPileState) => state.error
);

export const getAllDiscardPile = createSelector(
  getDiscardPileState,
  (state: DiscardPileState) => selectAll(state)
);

export const getDiscardPileEntities = createSelector(
  getDiscardPileState,
  (state: DiscardPileState) => selectEntities(state)
);

export const getDiscardPileSelectedId = createSelector(
  getDiscardPileState,
  (state: DiscardPileState) => state.selectedId
);

export const getDiscarPileSelected = createSelector(
  getDiscardPileEntities,
  getDiscardPileSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
