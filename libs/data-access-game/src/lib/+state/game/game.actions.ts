import { createAction, props } from '@ngrx/store';
import {
  DomainColor,
  EventValue,
  GamePhase,
  ResourceValue,
} from '@taormina/shared-models';

export const initNewGame = createAction('[Start Page] Init New Game');

export const setPhase = createAction(
  '[Game] Set Phase',
  props<{ phase: GamePhase }>()
);

export const setPlayer = createAction(
  '[Game] Set Player',
  props<{ player: DomainColor }>()
);

export const throwDice = createAction('[Dice Component] Throw Dice');
export const throwProductionDie = createAction(
  '[Dice Component] Throw Production Die'
);
export const throwEventDie = createAction('[Dice Component] Throw Event Die');
export const setProductionDie = createAction(
  '[Dice] Set Production Die',
  props<{ value: ResourceValue }>()
);
export const setNextProductionDie = createAction(
  '[Dice] Set Next Production Die',
  props<{ value: ResourceValue | undefined }>()
);
export const setEventDie = createAction(
  '[Dice] Set Event Die',
  props<{ value: EventValue }>()
);
