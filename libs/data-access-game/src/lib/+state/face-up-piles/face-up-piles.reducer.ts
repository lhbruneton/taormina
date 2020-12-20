import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FaceUpPilesActions from './face-up-piles.actions';
import { FaceUpPilesEntity } from './face-up-piles.models';

export const FACE_UP_PILES_FEATURE_KEY = 'faceUpPiles';

export interface State extends EntityState<FaceUpPilesEntity> {
  selectedId?: string | number; // which FaceUpPiles record has been selected
  loaded: boolean; // has the FaceUpPiles list been loaded
  error?: string | null; // last known error (if any)
}

export interface FaceUpPilesPartialState {
  readonly [FACE_UP_PILES_FEATURE_KEY]: State;
}

export const faceUpPilesAdapter: EntityAdapter<FaceUpPilesEntity> = createEntityAdapter<
  FaceUpPilesEntity
>();

export const initialState: State = faceUpPilesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const faceUpPilesReducer = createReducer(
  initialState,
  on(FaceUpPilesActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(FaceUpPilesActions.loadFaceUpPilesSuccess, (state, { faceUpPiles }) =>
    faceUpPilesAdapter.setAll(faceUpPiles, { ...state, loaded: true })
  ),
  on(FaceUpPilesActions.loadFaceUpPilesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return faceUpPilesReducer(state, action);
}
