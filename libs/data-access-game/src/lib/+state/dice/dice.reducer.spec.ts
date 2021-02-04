import { Action } from '@ngrx/store';
import { EventValue } from '@taormina/shared-models';

import * as DiceActions from './dice.actions';
import { createEventDiceEntity, createResourceDiceEntity } from './dice.models';
import { diceReducer, DiceState, initialDiceState } from './dice.reducer';

describe('Dice Reducer', () => {
  describe('valid Dice actions', () => {
    it('loadDiceSuccess should set the list of known Dice', () => {
      const dice = [
        createResourceDiceEntity(1),
        createEventDiceEntity(EventValue.Thieves),
      ];
      const action = DiceActions.loadDiceSuccess({ dice });

      const result: DiceState = diceReducer(initialDiceState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = diceReducer(initialDiceState, action);

      expect(result).toBe(initialDiceState);
    });
  });
});
