import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DISCARD_PILE_FEATURE_KEY,
  State,
  DiscardPilePartialState,
  discardPileAdapter,
} from './discard-pile.reducer';

// Lookup the 'DiscardPile' feature state managed by NgRx
export const getDiscardPileState = createFeatureSelector<
  DiscardPilePartialState,
  State
>(DISCARDPILE_FEATURE_KEY);

const { selectAll, selectEntities } = discardPileAdapter.getSelectors();

export const getDiscardPileLoaded = createSelector(
  getDiscardPileState,
  (state: State) => state.loaded
);

export const getDiscardPileError = createSelector(
  getDiscardPileState,
  (state: State) => state.error
);

export const getAllDiscardPile = createSelector(
  getDiscardPileState,
  (state: State) => selectAll(state)
);

export const getDiscardPileEntities = createSelector(
  getDiscardPileState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDiscardPileState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDiscardPileEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
