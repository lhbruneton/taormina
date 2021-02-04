import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as HandCardsActions from './hand-cards.actions';
import { HandCardsEntity } from './hand-cards.models';

export const HAND_CARDS_FEATURE_KEY = 'handCards';

export interface HandCardsState extends EntityState<HandCardsEntity> {
  selectedId?: string; // which HandCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the HandCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface HandCardsPartialState {
  readonly [HAND_CARDS_FEATURE_KEY]: HandCardsState;
}

export const handCardsAdapter: EntityAdapter<HandCardsEntity> = createEntityAdapter<HandCardsEntity>();

export const initialHandCardsState: HandCardsState = handCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const handCardsReducer = createReducer(
  initialHandCardsState,
  on(HandCardsActions.initHandCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(HandCardsActions.initHandCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(HandCardsActions.loadHandCardsSuccess, (state, { handCards }) =>
    handCardsAdapter.setAll(handCards, { ...state, loaded: true })
  ),
  on(HandCardsActions.loadHandCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(HandCardsActions.setHandCardsInitialized, (state, { handCards }) =>
    handCardsAdapter.setAll(handCards, { ...state, initialized: true })
  ),
  on(HandCardsActions.addHandCards, (state, { handCards }) =>
    handCardsAdapter.addMany(handCards, state)
  )
);
