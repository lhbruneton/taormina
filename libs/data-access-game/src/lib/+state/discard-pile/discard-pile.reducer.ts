import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiscardPileActions from './discard-pile.actions';
import { DiscardPileEntity } from './discard-pile.models';

export const DISCARD_PILE_FEATURE_KEY = 'discardPile';

export interface DiscardPileState extends EntityState<DiscardPileEntity> {
  selectedId?: string | number; // which DiscardPile record has been selected
  loaded: boolean; // has the DiscardPile list been loaded
  error?: string | null; // last known error (if any)
}

export interface DiscardPilePartialState {
  readonly [DISCARD_PILE_FEATURE_KEY]: DiscardPileState;
}

export const discardPileAdapter: EntityAdapter<DiscardPileEntity> = createEntityAdapter<
  DiscardPileEntity
>();

export const initialDiscardPileState: DiscardPileState = discardPileAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const discardPileReducer = createReducer(
  initialDiscardPileState,
  on(DiscardPileActions.initDiscardPile, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DiscardPileActions.loadDiscardPileSuccess, (state, { discardPile }) =>
    discardPileAdapter.setAll(discardPile, { ...state, loaded: true })
  ),
  on(DiscardPileActions.loadDiscardPileFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
