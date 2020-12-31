import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { CardsEntity } from '../../model/cards.models';

export const DISCARD_PILE_CARDS_FEATURE_KEY = 'discardPileCards';

export interface DiscardPileCardsState extends EntityState<CardsEntity> {
  selectedId?: string | number; // which DiscardPileCards record has been selected
  loaded: boolean; // has the DiscardPileCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface DiscardPileCardsPartialState {
  readonly [DISCARD_PILE_CARDS_FEATURE_KEY]: DiscardPileCardsState;
}

export const discardPileCardsAdapter: EntityAdapter<CardsEntity> = createEntityAdapter<CardsEntity>();

export const initialDiscardPileCardsState: DiscardPileCardsState = discardPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const discardPileCardsReducer = createReducer(
  initialDiscardPileCardsState,
  on(DiscardPileCardsActions.initDiscardPileCards, (state) => ({
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
  )
);
