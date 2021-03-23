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
  props<{ error: string }>()
);

export const setFaceUpPilesCardsInitialized = createAction(
  '[FaceUpPilesCards] Set FaceUpPilesCards On Init',
  props<{ faceUpPilesCards: FaceUpPilesCardsEntity[] }>()
);

export const removeFaceUpPileCard = createAction(
  '[FaceUpPilesCards] Remove FaceUpPileCard',
  props<{ id: string }>()
);

export const selectFirstCardFromFaceUpPile = createAction(
  '[FaceUpPilesCards] Select FirstCardFromFaceUpPile',
  props<{ pileId: string }>()
);

export const selectFaceUpPileCard = createAction(
  '[FaceUpPilesCards] Select Face Up Pile Card',
  props<{ id: string }>()
);

export const unselectFaceUpPileCard = createAction(
  '[FaceUpPilesCards] Unselect Face Up Pile Card'
);

export const setFaceUpPilesCardsError = createAction(
  '[FaceUpPilesCards] Set FaceUpPilesCards Error',
  props<{ error: string }>()
);
