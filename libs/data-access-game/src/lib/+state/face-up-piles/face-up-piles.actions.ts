import { createAction, props } from '@ngrx/store';
import { FaceUpPilesEntity } from './face-up-piles.models';

export const initFaceUpNewGame = createAction(
  '[Start Page] Init FaceUpPiles New Game'
);

export const initFaceUpSavedGame = createAction(
  '[Start Page] Init FaceUpPiles Saved Game'
);

export const loadFaceUpPilesSuccess = createAction(
  '[FaceUpPiles/API] Load FaceUpPiles Success',
  props<{ faceUpPiles: FaceUpPilesEntity[] }>()
);

export const loadFaceUpPilesFailure = createAction(
  '[FaceUpPiles/API] Load FaceUpPiles Failure',
  props<{ error: any }>()
);

export const setFaceUpPilesInitialized = createAction(
  '[FaceUpPiles] Set FaceUpPiles On Init',
  props<{ faceUpPiles: FaceUpPilesEntity[] }>()
);
