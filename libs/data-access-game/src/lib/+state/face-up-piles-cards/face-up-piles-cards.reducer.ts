import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { FaceUpPilesCardsEntity } from './face-up-piles-cards.models';

export const FACE_UP_PILES_CARDS_FEATURE_KEY = 'faceUpPilesCards';

export interface FaceUpPilesCardsState
  extends EntityState<FaceUpPilesCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
}

export interface FaceUpPilesCardsPartialState {
  readonly [FACE_UP_PILES_CARDS_FEATURE_KEY]: FaceUpPilesCardsState;
}

export const faceUpPilesCardsAdapter: EntityAdapter<FaceUpPilesCardsEntity> = createEntityAdapter<FaceUpPilesCardsEntity>();

export const initialFaceUpPilesCardsState: FaceUpPilesCardsState = faceUpPilesCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const faceUpPilesCardsReducer = createReducer(
  initialFaceUpPilesCardsState,
  on(FaceUpPilesCardsActions.initFaceUpNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(FaceUpPilesCardsActions.initFaceUpSavedGame, (state) => ({
    ...state,
    loaded: false,
    errorMsg: undefined,
  })),
  on(
    FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess,
    (state, { faceUpPilesCards }) =>
      faceUpPilesCardsAdapter.setAll(faceUpPilesCards, {
        ...state,
        loaded: true,
      })
  ),
  on(
    FaceUpPilesCardsActions.loadFaceUpPilesCardsFailure,
    (state, { error }) => ({
      ...state,
      errorMsg: error,
    })
  ),
  on(
    FaceUpPilesCardsActions.setFaceUpPilesCardsInitialized,
    (state, { faceUpPilesCards }) =>
      faceUpPilesCardsAdapter.setAll(faceUpPilesCards, {
        ...state,
        initialized: true,
      })
  ),
  on(FaceUpPilesCardsActions.selectFaceUpPileCard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(FaceUpPilesCardsActions.unselectFaceUpPileCard, (state) => ({
    ...state,
    selectedId: undefined,
  })),
  on(FaceUpPilesCardsActions.removeFaceUpPileCard, (state, { id }) =>
    faceUpPilesCardsAdapter.removeOne(id, state)
  ),
  on(FaceUpPilesCardsActions.setFaceUpPilesCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  }))
);
