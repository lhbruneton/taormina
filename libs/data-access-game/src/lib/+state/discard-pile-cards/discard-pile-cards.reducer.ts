import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { DiscardPileCardsEntity } from './discard-pile-cards.models';

export const DISCARD_PILE_CARDS_FEATURE_KEY = 'discardPileCards';

export interface DiscardPileCardsState
  extends EntityState<DiscardPileCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
}

export interface DiscardPileCardsPartialState {
  readonly [DISCARD_PILE_CARDS_FEATURE_KEY]: DiscardPileCardsState;
}

// eslint-disable-next-line max-len
export const discardPileCardsAdapter: EntityAdapter<DiscardPileCardsEntity> =
  createEntityAdapter<DiscardPileCardsEntity>();

export const initialDiscardPileCardsState: DiscardPileCardsState =
  discardPileCardsAdapter.getInitialState({
    // set initial required properties
    initialized: false,
    loaded: false,
  });

export const discardPileCardsReducer = createReducer(
  initialDiscardPileCardsState,
  on(DiscardPileCardsActions.initDiscardPileCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(DiscardPileCardsActions.initDiscardPileCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    errorMsg: undefined,
  })),
  on(
    DiscardPileCardsActions.loadDiscardPileCardsSuccess,
    (state, { discardPileCards }) =>
      discardPileCardsAdapter.setAll(discardPileCards, {
        ...state,
        loaded: true,
      })
  ),
  on(
    DiscardPileCardsActions.loadDiscardPileCardsFailure,
    (state, { error }) => ({ ...state, errorMsg: error })
  ),
  on(
    DiscardPileCardsActions.setDiscardPileCardsInitialized,
    (state, { discardPileCards }) =>
      discardPileCardsAdapter.setAll(discardPileCards, {
        ...state,
        initialized: true,
      })
  ),
  on(DiscardPileCardsActions.setDiscardPileCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  }))
);
