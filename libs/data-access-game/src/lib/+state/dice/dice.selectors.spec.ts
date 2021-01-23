import { EventValue } from '@taormina/shared-models';

import { createEventDiceEntity, createResourceDiceEntity } from './dice.models';
import { diceAdapter, initialDiceState } from './dice.reducer';
import * as DiceSelectors from './dice.selectors';

describe('Dice Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiceId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      dice: diceAdapter.setAll(
        [
          createResourceDiceEntity(1),
          createEventDiceEntity(EventValue.Thieves),
        ],
        {
          ...initialDiceState,
          selectedId: 'RESOURCE',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Dice Selectors', () => {
    it('getAllDice() should return the list of Dice', () => {
      const results = DiceSelectors.getAllDice(state);
      const secId = getDiceId(results[1]);

      expect(results.length).toBe(2);
      expect(secId).toBe('EVENT');
    });

    it('getDiceSelected() should return the selected Entity', () => {
      const result = DiceSelectors.getDiceSelected(state);
      const selId = getDiceId(result);

      expect(selId).toBe('RESOURCE');
    });

    it("getDiceLoaded() should return the current 'loaded' status", () => {
      const result = DiceSelectors.getDiceLoaded(state);

      expect(result).toBe(true);
    });

    it("getDiceError() should return the current 'error' state", () => {
      const result = DiceSelectors.getDiceError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
