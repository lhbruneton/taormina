import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DomainsActions from './domains.actions';
import { DomainsEntity } from './domains.models';

export const DOMAINS_FEATURE_KEY = 'domains';

export interface DomainsState extends EntityState<DomainsEntity> {
  selectedId?: string | number; // which Domains record has been selected
  initialized: boolean;
  loaded: boolean; // has the Domains list been loaded
  error?: string | null; // last known error (if any)
}

export interface DomainsPartialState {
  readonly [DOMAINS_FEATURE_KEY]: DomainsState;
}

export const domainsAdapter: EntityAdapter<DomainsEntity> = createEntityAdapter<DomainsEntity>();

export const initialDomainsState: DomainsState = domainsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const domainsReducer = createReducer(
  initialDomainsState,
  on(DomainsActions.initDomainsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(DomainsActions.initDomainsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DomainsActions.loadDomainsSuccess, (state, { domains }) =>
    domainsAdapter.setAll(domains, { ...state, loaded: true })
  ),
  on(DomainsActions.loadDomainsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(DomainsActions.setDomainsInitialized, (state, { domains }) =>
    domainsAdapter.setAll(domains, { ...state, initialized: true })
  )
);
