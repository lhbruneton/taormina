import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as AgglomerationPilesCardsActions from './agglomeration-piles-cards.actions';
import { AgglomerationPilesCardsEntity } from './agglomeration-piles-cards.models';

export const AGGLOMERATION_PILES_CARDS_FEATURE_KEY = 'agglomerationPilesCards';

export interface AgglomerationPilesCardsState
  extends EntityState<AgglomerationPilesCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
}

export interface AgglomerationPilesCardsPartialState {
  readonly [AGGLOMERATION_PILES_CARDS_FEATURE_KEY]: AgglomerationPilesCardsState;
}

// eslint-disable-next-line max-len
export const agglomerationPilesCardsAdapter: EntityAdapter<AgglomerationPilesCardsEntity> =
  createEntityAdapter<AgglomerationPilesCardsEntity>();

export const initialAgglomerationPilesCardsState: AgglomerationPilesCardsState =
  agglomerationPilesCardsAdapter.getInitialState({
    // set initial required properties
    initialized: false,
    loaded: false,
  });

export const agglomerationPilesCardsReducer = createReducer(
  initialAgglomerationPilesCardsState,
  on(AgglomerationPilesCardsActions.initAgglomerationNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(AgglomerationPilesCardsActions.initAgglomerationSavedGame, (state) => ({
    ...state,
    loaded: false,
    errorMsg: undefined,
  })),
  on(
    AgglomerationPilesCardsActions.loadAgglomerationPilesCardsSuccess,
    (state, { agglomerationPilesCards }) =>
      agglomerationPilesCardsAdapter.setAll(agglomerationPilesCards, {
        ...state,
        loaded: true,
      })
  ),
  on(
    AgglomerationPilesCardsActions.loadAgglomerationPilesCardsFailure,
    (state, { error }) => ({
      ...state,
      errorMsg: error,
    })
  ),
  on(
    AgglomerationPilesCardsActions.setAgglomerationPilesCardsInitialized,
    (state, { agglomerationPilesCards }) =>
      agglomerationPilesCardsAdapter.setAll(agglomerationPilesCards, {
        ...state,
        initialized: true,
      })
  ),
  on(
    AgglomerationPilesCardsActions.selectAgglomerationPileCard,
    (state, { id }) => ({
      ...state,
      selectedId: id,
    })
  ),
  on(AgglomerationPilesCardsActions.unselectAgglomerationPileCard, (state) => ({
    ...state,
    selectedId: undefined,
  })),
  on(
    AgglomerationPilesCardsActions.removeAgglomerationPileCard,
    (state, { id }) => agglomerationPilesCardsAdapter.removeOne(id, state)
  ),
  on(
    AgglomerationPilesCardsActions.setAgglomerationPilesCardsError,
    (state, { error }) => ({
      ...state,
      errorMsg: error,
    })
  )
);
