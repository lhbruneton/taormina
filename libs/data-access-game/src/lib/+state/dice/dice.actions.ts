import { createAction, props } from '@ngrx/store';
import { DiceEntity } from './dice.models';

export const initDiceNewGame = createAction('[Start Page] Init Dice New Game');

export const initDiceSavedGame = createAction(
  '[Start Page] Init Dice Saved Game'
);

export const loadDiceSuccess = createAction(
  '[Dice/API] Load Dice Success',
  props<{ dice: DiceEntity[] }>()
);

export const loadDiceFailure = createAction(
  '[Dice/API] Load Dice Failure',
  props<{ error: any }>()
);

export const setDiceInitialized = createAction(
  '[Dice] Set Dice On Init',
  props<{ dice: DiceEntity[] }>()
);
