import { createAction, props } from '@ngrx/store';
import { FaceUpPilesCardsEntity } from './face-up-piles-cards.models';

export const initFaceUpNewGame = createAction(
  '[Start Page] Init FaceUpPilesCards New Game'
);

export const initFaceUpSavedGame = createAction(
  '[Start Page] Init FaceUpPilesCards Saved Game'
);

export const loadFaceUpPilesCardsSuccess = createAction(
  '[FaceUpPilesCards/API] Load FaceUpPilesCards Success',
  props<{ faceUpPilesCards: FaceUpPilesCardsEntity[] }>()
);

export const loadFaceUpPilesCardsFailure = createAction(
  '[FaceUpPilesCards/API] Load FaceUpPilesCards Failure',
  props<{ error: unknown }>()
);

export const setFaceUpPilesCardsInitialized = createAction(
  '[FaceUpPilesCards] Set FaceUpPilesCards On Init',
  props<{ faceUpPilesCards: FaceUpPilesCardsEntity[] }>()
);
