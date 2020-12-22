import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FaceUpPilesActions from './face-up-piles.actions';
import { FaceUpPilesEntity } from './face-up-piles.models';

export const FACE_UP_PILES_FEATURE_KEY = 'faceUpPiles';

export interface FaceUpState extends EntityState<FaceUpPilesEntity> {
  selectedId?: string | number; // which FaceUpPiles record has been selected
  loaded: boolean; // has the FaceUpPiles list been loaded
  error?: string | null; // last known error (if any)
}

export interface FaceUpPilesPartialState {
  readonly [FACE_UP_PILES_FEATURE_KEY]: FaceUpState;
}

export const faceUpPilesAdapter: EntityAdapter<FaceUpPilesEntity> = createEntityAdapter<
  FaceUpPilesEntity
>();

export const initialFaceUpState: FaceUpState = faceUpPilesAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const faceUpPilesReducer = createReducer(
  initialFaceUpState,
  on(FaceUpPilesActions.initFaceUp, (state) => ({
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
