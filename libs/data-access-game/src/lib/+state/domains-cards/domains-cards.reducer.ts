import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DomainsCardsActions from './domains-cards.actions';
import { DomainsCardsEntity } from './domains-cards.models';

export const DOMAINS_CARDS_FEATURE_KEY = 'domainsCards';

export interface DomainsCardsState extends EntityState<DomainsCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
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
    errorMsg: undefined,
  })),
  on(DomainsCardsActions.loadDomainsCardsSuccess, (state, { domainsCards }) =>
    domainsCardsAdapter.setAll(domainsCards, { ...state, loaded: true })
  ),
  on(DomainsCardsActions.loadDomainsCardsFailure, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(
    DomainsCardsActions.setDomainsCardsInitialized,
    (state, { domainsCards }) =>
      domainsCardsAdapter.setAll(domainsCards, { ...state, initialized: true })
  ),
  on(DomainsCardsActions.updateDomainCard, (state, { update }) =>
    domainsCardsAdapter.updateOne(update, state)
  ),
  on(DomainsCardsActions.updateDomainsCards, (state, { updates }) =>
    domainsCardsAdapter.updateMany(updates, state)
  ),
  on(DomainsCardsActions.addDomainCard, (state, { domainCard }) =>
    domainsCardsAdapter.addOne(domainCard, state)
  ),
  on(DomainsCardsActions.selectDomainCard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(DomainsCardsActions.unselectDomainCard, (state) => ({
    ...state,
    selectedId: undefined,
  })),
  on(DomainsCardsActions.setDomainsCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  }))
);
