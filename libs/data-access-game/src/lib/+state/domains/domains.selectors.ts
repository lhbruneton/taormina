import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DOMAINS_FEATURE_KEY,
  State,
  DomainsPartialState,
  domainsAdapter,
} from './domains.reducer';

// Lookup the 'Domains' feature state managed by NgRx
export const getDomainsState = createFeatureSelector<
  DomainsPartialState,
  State
>(DOMAINS_FEATURE_KEY);

const { selectAll, selectEntities } = domainsAdapter.getSelectors();

export const getDomainsLoaded = createSelector(
  getDomainsState,
  (state: State) => state.loaded
);

export const getDomainsError = createSelector(
  getDomainsState,
  (state: State) => state.error
);

export const getAllDomains = createSelector(getDomainsState, (state: State) =>
  selectAll(state)
);

export const getDomainsEntities = createSelector(
  getDomainsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDomainsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDomainsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
