import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DISCARD_PILE_CARDS_FEATURE_KEY,
  DiscardPileCardsState,
  DiscardPileCardsPartialState,
  discardPileCardsAdapter,
} from './discard-pile-cards.reducer';

// Lookup the 'DiscardPileCards' feature state managed by NgRx
export const getDiscardPileCardsState = createFeatureSelector<
  DiscardPileCardsPartialState,
  DiscardPileCardsState
>(DISCARD_PILE_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = discardPileCardsAdapter.getSelectors();

export const getDiscardPileCardsLoaded = createSelector(
  getDiscardPileCardsState,
  (state: DiscardPileCardsState) => state.loaded
);

export const getDiscardPileCardsError = createSelector(
  getDiscardPileCardsState,
  (state: DiscardPileCardsState) => state.errorMsg
);

export const getAllDiscardPileCards = createSelector(
  getDiscardPileCardsState,
  (state: DiscardPileCardsState) => selectAll(state)
);

export const getAllDiscardPileCardsReverse = createSelector(
  getDiscardPileCardsState,
  (state: DiscardPileCardsState) => [...selectAll(state)].reverse()
);

export const getDiscardPileCardsEntities = createSelector(
  getDiscardPileCardsState,
  (state: DiscardPileCardsState) => selectEntities(state)
);

export const getDiscardPileCardsSelectedId = createSelector(
  getDiscardPileCardsState,
  (state: DiscardPileCardsState) => state.selectedId
);

export const getDiscardPileCardsSelected = createSelector(
  getDiscardPileCardsEntities,
  getDiscardPileCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
