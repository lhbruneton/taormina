import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { DiscardPileCardsEntity } from './discard-pile-cards.models';

export const DISCARD_PILE_CARDS_FEATURE_KEY = 'discardPileCards';

export interface DiscardPileCardsState
  extends EntityState<DiscardPileCardsEntity> {
  selectedId?: string; // which DiscardPileCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the DiscardPileCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface DiscardPileCardsPartialState {
  readonly [DISCARD_PILE_CARDS_FEATURE_KEY]: DiscardPileCardsState;
}

export const discardPileCardsAdapter: EntityAdapter<DiscardPileCardsEntity> = createEntityAdapter<DiscardPileCardsEntity>();

export const initialDiscardPileCardsState: DiscardPileCardsState = discardPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const discardPileCardsReducer = createReducer(
  initialDiscardPileCardsState,
  on(DiscardPileCardsActions.initDiscardPileCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(DiscardPileCardsActions.initDiscardPileCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
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
    (state, { error }) => ({ ...state, error })
  ),
  on(
    DiscardPileCardsActions.setDiscardPileCardsInitialized,
    (state, { discardPileCards }) =>
      discardPileCardsAdapter.setAll(discardPileCards, {
        ...state,
        initialized: true,
      })
  )
);
