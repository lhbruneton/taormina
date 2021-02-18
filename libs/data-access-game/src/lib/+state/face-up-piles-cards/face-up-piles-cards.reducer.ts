import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { FaceUpPilesCardsEntity } from './face-up-piles-cards.models';

export const FACE_UP_PILES_CARDS_FEATURE_KEY = 'faceUpPilesCards';

export interface FaceUpState extends EntityState<FaceUpPilesCardsEntity> {
  selectedId?: string; // which AgglomerationCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the AgglomerationCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface FaceUpPilesCardsPartialState {
  readonly [FACE_UP_PILES_CARDS_FEATURE_KEY]: FaceUpState;
}

export const faceUpPilesCardsAdapter: EntityAdapter<FaceUpPilesCardsEntity> = createEntityAdapter<FaceUpPilesCardsEntity>();

export const initialFaceUpState: FaceUpState = faceUpPilesCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const faceUpPilesCardsReducer = createReducer(
  initialFaceUpState,
  on(FaceUpPilesCardsActions.initFaceUpNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(FaceUpPilesCardsActions.initFaceUpSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess,
    (state, { agglomerationCards }) =>
      faceUpPilesCardsAdapter.setAll(agglomerationCards, {
        ...state,
        loaded: true,
      })
  ),
  on(
    FaceUpPilesCardsActions.loadFaceUpPilesCardsFailure,
    (state, { error }) => ({
      ...state,
      error,
    })
  ),
  on(
    FaceUpPilesCardsActions.setFaceUpPilesCardsInitialized,
    (state, { agglomerationCards }) =>
      faceUpPilesCardsAdapter.setAll(agglomerationCards, {
        ...state,
        initialized: true,
      })
  )
);
