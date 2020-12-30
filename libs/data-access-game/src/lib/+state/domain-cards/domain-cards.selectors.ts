import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DOMAIN_CARDS_FEATURE_KEY,
  DomainCardsState,
  DomainCardsPartialState,
  domainCardsAdapter,
} from './domain-cards.reducer';

// Lookup the 'DomainCards' feature state managed by NgRx
export const getDomainCardsState = createFeatureSelector<
  DomainCardsPartialState,
  DomainCardsState
>(DOMAIN_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = domainCardsAdapter.getSelectors();

export const getDomainCardsLoaded = createSelector(
  getDomainCardsState,
  (state: DomainCardsState) => state.loaded
);

export const getDomainCardsError = createSelector(
  getDomainCardsState,
  (state: DomainCardsState) => state.error
);

export const getAllDomainCards = createSelector(
  getDomainCardsState,
  (state: DomainCardsState) => selectAll(state)
);

export const getDomainCardsEntities = createSelector(
  getDomainCardsState,
  (state: DomainCardsState) => selectEntities(state)
);

export const getDomainCardsSelectedId = createSelector(
  getDomainCardsState,
  (state: DomainCardsState) => state.selectedId
);

export const getDomainCardsSelected = createSelector(
  getDomainCardsEntities,
  getDomainCardsSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
