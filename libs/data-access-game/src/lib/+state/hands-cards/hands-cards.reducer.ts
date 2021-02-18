import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as HandsCardsActions from './hands-cards.actions';
import { HandsCardsEntity } from './hands-cards.models';

export const HANDS_CARDS_FEATURE_KEY = 'handsCards';

export interface HandsCardsState extends EntityState<HandsCardsEntity> {
  selectedId?: string; // which HandsCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the HandsCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface HandsCardsPartialState {
  readonly [HANDS_CARDS_FEATURE_KEY]: HandsCardsState;
}

export const handsCardsAdapter: EntityAdapter<HandsCardsEntity> = createEntityAdapter<HandsCardsEntity>();

export const initialHandsCardsState: HandsCardsState = handsCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const handsCardsReducer = createReducer(
  initialHandsCardsState,
  on(HandsCardsActions.initHandsCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(HandsCardsActions.initHandsCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(HandsCardsActions.loadHandsCardsSuccess, (state, { handsCards }) =>
    handsCardsAdapter.setAll(handsCards, { ...state, loaded: true })
  ),
  on(HandsCardsActions.loadHandsCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(HandsCardsActions.setHandsCardsInitialized, (state, { handsCards }) =>
    handsCardsAdapter.setAll(handsCards, { ...state, initialized: true })
  ),
  on(HandsCardsActions.addHandsCards, (state, { handsCards }) =>
    handsCardsAdapter.addMany(handsCards, state)
  )
);
