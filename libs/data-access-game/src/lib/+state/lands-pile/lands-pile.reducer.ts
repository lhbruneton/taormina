import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LandsPileActions from './lands-pile.actions';
import { LandsPileEntity } from './lands-pile.models';

export const LANDS_PILE_FEATURE_KEY = 'landsPile';

export interface State extends EntityState<LandsPileEntity> {
  selectedId?: string | number; // which LandsPile record has been selected
  loaded: boolean; // has the LandsPile list been loaded
  error?: string | null; // last known error (if any)
}

export interface LandsPilePartialState {
  readonly [LANDS_PILE_FEATURE_KEY]: State;
}

export const landsPileAdapter: EntityAdapter<LandsPileEntity> = createEntityAdapter<
  LandsPileEntity
>();

export const initialState: State = landsPileAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const landsPileReducer = createReducer(
  initialState,
  on(LandsPileActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(LandsPileActions.loadLandsPileSuccess, (state, { landsPile }) =>
    landsPileAdapter.setAll(landsPile, { ...state, loaded: true })
  ),
  on(LandsPileActions.loadLandsPileFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return landsPileReducer(state, action);
}
