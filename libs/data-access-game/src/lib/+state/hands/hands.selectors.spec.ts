import { createHandsEntity } from './hands.models';
import { HandsState, handsAdapter, initialHandsState } from './hands.reducer';
import * as HandsSelectors from './hands.selectors';

describe('Hands Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHandsId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      hands: handsAdapter.setAll(
        [
          createHandsEntity('PRODUCT-AAA'),
          createHandsEntity('PRODUCT-BBB'),
          createHandsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialHandsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Hands Selectors', () => {
    it('getAllHands() should return the list of Hands', () => {
      const results = HandsSelectors.getAllHands(state);
      const selId = getHandsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getHandsSelected() should return the selected Entity', () => {
      const result = HandsSelectors.getHandsSelected(state);
      const selId = getHandsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getHandsLoaded() should return the current 'loaded' status", () => {
      const result = HandsSelectors.getHandsLoaded(state);

      expect(result).toBe(true);
    });

    it("getHandsError() should return the current 'error' state", () => {
      const result = HandsSelectors.getHandsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
