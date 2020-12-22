import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LandsPileActions from './lands-pile.actions';
import { LandsPileEntity } from './lands-pile.models';

export const LANDS_PILE_FEATURE_KEY = 'landsPile';

export interface LandsPileState extends EntityState<LandsPileEntity> {
  selectedId?: string | number; // which LandsPile record has been selected
  loaded: boolean; // has the LandsPile list been loaded
  error?: string | null; // last known error (if any)
}

export interface LandsPilePartialState {
  readonly [LANDS_PILE_FEATURE_KEY]: LandsPileState;
}

export const landsPileAdapter: EntityAdapter<LandsPileEntity> = createEntityAdapter<
  LandsPileEntity
>();

export const initialLandsPileState: LandsPileState = landsPileAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const landsPileReducer = createReducer(
  initialLandsPileState,
  on(LandsPileActions.initLandsPile, (state) => ({
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
