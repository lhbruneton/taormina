import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DOMAINS_CARDS_FEATURE_KEY,
  DomainsCardsState,
  DomainsCardsPartialState,
  domainsCardsAdapter,
} from './domains-cards.reducer';

// Lookup the 'DomainsCards' feature state managed by NgRx
export const getDomainsCardsState = createFeatureSelector<
  DomainsCardsPartialState,
  DomainsCardsState
>(DOMAINS_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = domainsCardsAdapter.getSelectors();

export const getDomainsCardsLoaded = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.loaded
);

export const getDomainsCardsError = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.error
);

export const getAllDomainsCards = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => selectAll(state)
);

export const getDomainsCardsEntities = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => selectEntities(state)
);

export const getDomainsCardsSelectedId = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.selectedId
);

export const getDomainsCardsSelected = createSelector(
  getDomainsCardsEntities,
  getDomainsCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
