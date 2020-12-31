import { DiceEntity } from './dice.models';
import { DiceState, diceAdapter, initialDiceState } from './dice.reducer';
import * as DiceSelectors from './dice.selectors';

describe('Dice Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiceId = (it) => it['id'];
  const createDiceEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiceEntity);

  let state;

  beforeEach(() => {
    state = {
      dice: diceAdapter.setAll(
        [
          createDiceEntity('PRODUCT-AAA'),
          createDiceEntity('PRODUCT-BBB'),
          createDiceEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDiceState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Dice Selectors', () => {
    it('getAllDice() should return the list of Dice', () => {
      const results = DiceSelectors.getAllDice(state);
      const selId = getDiceId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DiceSelectors.getDiceSelected(state);
      const selId = getDiceId(result);

      expect(selId).toBe('PRODUCT-BBB');
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
