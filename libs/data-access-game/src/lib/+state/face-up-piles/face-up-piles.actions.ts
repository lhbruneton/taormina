import { createAction, props } from '@ngrx/store';
import { AgglomerationCardsEntity } from '../cards/models/agglomeration';

export const initFaceUpNewGame = createAction(
  '[Start Page] Init FaceUpPiles New Game'
);

export const initFaceUpSavedGame = createAction(
  '[Start Page] Init FaceUpPiles Saved Game'
);

export const loadFaceUpPilesSuccess = createAction(
  '[FaceUpPiles/API] Load FaceUpPiles Success',
  props<{ agglomerationCards: AgglomerationCardsEntity[] }>()
);

export const loadFaceUpPilesFailure = createAction(
  '[FaceUpPiles/API] Load FaceUpPiles Failure',
  props<{ error: unknown }>()
);

export const setFaceUpPilesInitialized = createAction(
  '[FaceUpPiles] Set FaceUpPiles On Init',
  props<{ agglomerationCards: AgglomerationCardsEntity[] }>()
);
