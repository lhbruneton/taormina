import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LANDS_PILE_CARDS_FEATURE_KEY,
  LandsPileCardsState,
  LandsPileCardsPartialState,
  landsPileCardsAdapter,
} from './lands-pile-cards.reducer';

// Lookup the 'LandsPileCards' feature state managed by NgRx
export const getLandsPileCardsState = createFeatureSelector<
  LandsPileCardsPartialState,
  LandsPileCardsState
>(LANDS_PILE_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = landsPileCardsAdapter.getSelectors();

export const getLandsPileCardsLoaded = createSelector(
  getLandsPileCardsState,
  (state: LandsPileCardsState) => state.loaded
);

export const getLandsPileCardsError = createSelector(
  getLandsPileCardsState,
  (state: LandsPileCardsState) => state.errorMsg
);

export const getAllLandsPileCards = createSelector(
  getLandsPileCardsState,
  (state: LandsPileCardsState) => selectAll(state)
);

export const getLandsPileCardsEntities = createSelector(
  getLandsPileCardsState,
  (state: LandsPileCardsState) => selectEntities(state)
);

export const getLandsPileCardsSelectedId = createSelector(
  getLandsPileCardsState,
  (state: LandsPileCardsState) => state.selectedId
);

export const getLandsPileCardsSelected = createSelector(
  getLandsPileCardsEntities,
  getLandsPileCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
