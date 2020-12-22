import { createAction, props } from '@ngrx/store';
import { DiceEntity } from './dice.models';

export const initDice = createAction('[Dice Page] Init');

export const loadDiceSuccess = createAction(
  '[Dice/API] Load Dice Success',
  props<{ dice: DiceEntity[] }>()
);

export const loadDiceFailure = createAction(
  '[Dice/API] Load Dice Failure',
  props<{ error: any }>()
);
