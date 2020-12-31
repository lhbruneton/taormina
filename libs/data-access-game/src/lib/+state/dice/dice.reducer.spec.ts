import { DiceEntity } from './dice.models';
import * as DiceActions from './dice.actions';
import { DiceState, initialDiceState, diceReducer } from './dice.reducer';

describe('Dice Reducer', () => {
  const createDiceEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiceEntity);

  beforeEach(() => {});

  describe('valid Dice actions', () => {
    it('loadDiceSuccess should return set the list of known Dice', () => {
      const dice = [
        createDiceEntity('PRODUCT-AAA'),
        createDiceEntity('PRODUCT-zzz'),
      ];
      const action = DiceActions.loadDiceSuccess({ dice });

      const result: DiceState = diceReducer(initialDiceState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = diceReducer(initialDiceState, action);

      expect(result).toBe(initialDiceState);
    });
  });
});
