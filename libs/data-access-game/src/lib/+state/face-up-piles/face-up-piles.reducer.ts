import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { AgglomerationCardsEntity } from '../cards/models/agglomeration';
import * as FaceUpPilesActions from './face-up-piles.actions';

export const FACE_UP_PILES_FEATURE_KEY = 'faceUpPiles';

export interface FaceUpState extends EntityState<AgglomerationCardsEntity> {
  selectedId?: string | number; // which AgglomerationCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the AgglomerationCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface FaceUpPilesPartialState {
  readonly [FACE_UP_PILES_FEATURE_KEY]: FaceUpState;
}

export const faceUpPilesAdapter: EntityAdapter<AgglomerationCardsEntity> = createEntityAdapter<
  AgglomerationCardsEntity
>();

export const initialFaceUpState: FaceUpState = faceUpPilesAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const faceUpPilesReducer = createReducer(
  initialFaceUpState,
  on(FaceUpPilesActions.initFaceUpNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(FaceUpPilesActions.initFaceUpSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    FaceUpPilesActions.loadFaceUpPilesSuccess,
    (state, { agglomerationCards }) =>
      faceUpPilesAdapter.setAll(agglomerationCards, { ...state, loaded: true })
  ),
  on(FaceUpPilesActions.loadFaceUpPilesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    FaceUpPilesActions.setFaceUpPilesInitialized,
    (state, { agglomerationCards }) =>
      faceUpPilesAdapter.setAll(agglomerationCards, {
        ...state,
        initialized: true,
      })
  )
);
