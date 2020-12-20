import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiscardPileActions from './discard-pile.actions';
import { DiscardPileEntity } from './discard-pile.models';

export const DISCARD_PILE_FEATURE_KEY = 'discardPile';

export interface State extends EntityState<DiscardPileEntity> {
  selectedId?: string | number; // which DiscardPile record has been selected
  loaded: boolean; // has the DiscardPile list been loaded
  error?: string | null; // last known error (if any)
}

export interface DiscardPilePartialState {
  readonly [DISCARD_PILE_FEATURE_KEY]: State;
}

export const discardPileAdapter: EntityAdapter<DiscardPileEntity> = createEntityAdapter<
  DiscardPileEntity
>();

export const initialState: State = discardPileAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const discardPileReducer = createReducer(
  initialState,
  on(DiscardPileActions.init, (state) => ({
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

export function reducer(state: State | undefined, action: Action) {
  return discardPileReducer(state, action);
}
