import { createAction, props } from '@ngrx/store';
import { HandsEntity } from './hands.models';

export const initHandsNewGame = createAction(
  '[Start Page] Init Hands New Game'
);

export const initHandsSavedGame = createAction(
  '[Start Page] Init Hands Saved Game'
);

export const loadHandsSuccess = createAction(
  '[Hands/API] Load Hands Success',
  props<{ hands: HandsEntity[] }>()
);

export const loadHandsFailure = createAction(
  '[Hands/API] Load Hands Failure',
  props<{ error: unknown }>()
);

export const setHandsInitialized = createAction(
  '[Hands] Set Hands On Init',
  props<{ hands: HandsEntity[] }>()
);
