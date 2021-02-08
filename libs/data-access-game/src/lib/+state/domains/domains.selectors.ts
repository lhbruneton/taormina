import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DOMAINS_FEATURE_KEY,
  DomainsState,
  DomainsPartialState,
  domainsAdapter,
} from './domains.reducer';

// Lookup the 'Domains' feature state managed by NgRx
export const getDomainsState = createFeatureSelector<
  DomainsPartialState,
  DomainsState
>(DOMAINS_FEATURE_KEY);

const { selectAll, selectEntities } = domainsAdapter.getSelectors();

export const getDomainsLoaded = createSelector(
  getDomainsState,
  (state: DomainsState) => state.loaded
);

export const getDomainsError = createSelector(
  getDomainsState,
  (state: DomainsState) => state.error
);

export const getAllDomains = createSelector(
  getDomainsState,
  (state: DomainsState) => selectAll(state)
);

export const getDomainsEntities = createSelector(
  getDomainsState,
  (state: DomainsState) => selectEntities(state)
);

export const getDomainsSelectedId = createSelector(
  getDomainsState,
  (state: DomainsState) => state.selectedId
);

export const getDomainsSelected = createSelector(
  getDomainsEntities,
  getDomainsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);
