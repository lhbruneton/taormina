import { createAction, props } from '@ngrx/store';
import { FaceUpPilesEntity } from './face-up-piles.models';

export const initFaceUp = createAction('[FaceUpPiles Page] Init');

export const loadFaceUpPilesSuccess = createAction(
  '[FaceUpPiles/API] Load FaceUpPiles Success',
  props<{ faceUpPiles: FaceUpPilesEntity[] }>()
);

export const loadFaceUpPilesFailure = createAction(
  '[FaceUpPiles/API] Load FaceUpPiles Failure',
  props<{ error: any }>()
);
