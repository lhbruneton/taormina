import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as HandsActions from './hands.actions';
import { HandsEntity } from './hands.models';

export const HANDS_FEATURE_KEY = 'hands';

export interface HandsState extends EntityState<HandsEntity> {
  selectedId?: string | number; // which Hands record has been selected
  initialized: boolean;
  loaded: boolean; // has the Hands list been loaded
  error?: string | null; // last known error (if any)
}

export interface HandsPartialState {
  readonly [HANDS_FEATURE_KEY]: HandsState;
}

export const handsAdapter: EntityAdapter<HandsEntity> = createEntityAdapter<HandsEntity>();

export const initialHandsState: HandsState = handsAdapter.getInitialState({
  // set initial required properties
  initialized: false,
  loaded: false,
});

export const handsReducer = createReducer(
  initialHandsState,
  on(HandsActions.initHandsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(HandsActions.initHandsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(HandsActions.loadHandsSuccess, (state, { hands }) =>
    handsAdapter.setAll(hands, { ...state, loaded: true })
  ),
  on(HandsActions.loadHandsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(HandsActions.setHandsInitialized, (state, { hands }) =>
    handsAdapter.setAll(hands, { ...state, initialized: true })
  )
);
