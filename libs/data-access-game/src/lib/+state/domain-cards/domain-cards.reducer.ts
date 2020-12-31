import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DomainCardsActions from './domain-cards.actions';
import { DomainCardsEntity } from './domain-cards.models';

export const DOMAIN_CARDS_FEATURE_KEY = 'domainCards';

export interface DomainCardsState extends EntityState<DomainCardsEntity> {
  selectedId?: string | number; // which DomainCards record has been selected
  loaded: boolean; // has the DomainCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface DomainCardsPartialState {
  readonly [DOMAIN_CARDS_FEATURE_KEY]: DomainCardsState;
}

export const domainCardsAdapter: EntityAdapter<DomainCardsEntity> = createEntityAdapter<DomainCardsEntity>();

export const initialDomainCardsState: DomainCardsState = domainCardsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const domainCardsReducer = createReducer(
  initialDomainCardsState,
  on(DomainCardsActions.initDomainCards, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DomainCardsActions.loadDomainCardsSuccess, (state, { domainCards }) =>
    domainCardsAdapter.setAll(domainCards, { ...state, loaded: true })
  ),
  on(DomainCardsActions.loadDomainCardsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
