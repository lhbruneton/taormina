import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DomainsActions from './domains.actions';
import { DomainsEntity } from './domains.models';

export const DOMAINS_FEATURE_KEY = 'domains';

export interface State extends EntityState<DomainsEntity> {
  selectedId?: string | number; // which Domains record has been selected
  loaded: boolean; // has the Domains list been loaded
  error?: string | null; // last known error (if any)
}

export interface DomainsPartialState {
  readonly [DOMAINS_FEATURE_KEY]: State;
}

export const domainsAdapter: EntityAdapter<DomainsEntity> = createEntityAdapter<
  DomainsEntity
>();

export const initialState: State = domainsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const domainsReducer = createReducer(
  initialState,
  on(DomainsActions.init, (state) => ({
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
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return domainsReducer(state, action);
}
