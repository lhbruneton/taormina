import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DomainsCardsActions from './domains-cards.actions';
import { DomainsCardsEntity } from './domains-cards.models';

export const DOMAINS_CARDS_FEATURE_KEY = 'domainsCards';

export interface DomainsCardsState extends EntityState<DomainsCardsEntity> {
  selectedId?: string; // which DomainsCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the DomainsCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface DomainsCardsPartialState {
  readonly [DOMAINS_CARDS_FEATURE_KEY]: DomainsCardsState;
}

export const domainsCardsAdapter: EntityAdapter<DomainsCardsEntity> = createEntityAdapter<DomainsCardsEntity>();

export const initialDomainsCardsState: DomainsCardsState = domainsCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const domainsCardsReducer = createReducer(
  initialDomainsCardsState,
  on(DomainsCardsActions.initDomainsCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(DomainsCardsActions.initDomainsCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DomainsCardsActions.loadDomainsCardsSuccess, (state, { domainsCards }) =>
    domainsCardsAdapter.setAll(domainsCards, { ...state, loaded: true })
  ),
  on(DomainsCardsActions.loadDomainsCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    DomainsCardsActions.setDomainsCardsInitialized,
    (state, { domainsCards }) =>
      domainsCardsAdapter.setAll(domainsCards, { ...state, initialized: true })
  ),
  on(DomainsCardsActions.updateDomainsCards, (state, { updates }) =>
    domainsCardsAdapter.updateMany(updates, state)
  )
);
