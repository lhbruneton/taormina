import { createAction, props } from '@ngrx/store';
import { HandsEntity } from './hands.models';

export const init = createAction('[Hands Page] Init');

export const loadHandsSuccess = createAction(
  '[Hands/API] Load Hands Success',
  props<{ hands: HandsEntity[] }>()
);

export const loadHandsFailure = createAction(
  '[Hands/API] Load Hands Failure',
  props<{ error: any }>()
);
