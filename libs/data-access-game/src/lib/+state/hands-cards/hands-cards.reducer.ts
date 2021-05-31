import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as HandsCardsActions from './hands-cards.actions';
import { HandsCardsEntity } from './hands-cards.models';

export const HANDS_CARDS_FEATURE_KEY = 'handsCards';

export interface HandsCardsState extends EntityState<HandsCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
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
    errorMsg: undefined,
  })),
  on(HandsCardsActions.loadHandsCardsSuccess, (state, { handsCards }) =>
    handsCardsAdapter.setAll(handsCards, { ...state, loaded: true })
  ),
  on(HandsCardsActions.loadHandsCardsFailure, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(HandsCardsActions.setHandsCardsInitialized, (state, { handsCards }) =>
    handsCardsAdapter.setAll(handsCards, { ...state, initialized: true })
  ),
  on(HandsCardsActions.addHandsCards, (state, { handsCards }) =>
    handsCardsAdapter.addMany(handsCards, state)
  ),
  on(HandsCardsActions.setHandsCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(HandsCardsActions.selectHandCard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(HandsCardsActions.unselectHandCard, (state) => ({
    ...state,
    selectedId: undefined,
  })),
  on(HandsCardsActions.removeHandCard, (state, { id }) =>
    handsCardsAdapter.removeOne(id, state)
  )
);
