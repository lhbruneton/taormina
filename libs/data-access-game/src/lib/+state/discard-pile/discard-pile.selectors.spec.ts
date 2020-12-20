import { DiscardPileEntity } from './discard-pile.models';
import {
  State,
  discardPileAdapter,
  initialState,
} from './discard-pile.reducer';
import * as DiscardPileSelectors from './discard-pile.selectors';

describe('DiscardPile Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiscardPileId = (it) => it['id'];
  const createDiscardPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiscardPileEntity);

  let state;

  beforeEach(() => {
    state = {
      discardPile: discardPileAdapter.setAll(
        [
          createDiscardPileEntity('PRODUCT-AAA'),
          createDiscardPileEntity('PRODUCT-BBB'),
          createDiscardPileEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('DiscardPile Selectors', () => {
    it('getAllDiscardPile() should return the list of DiscardPile', () => {
      const results = DiscardPileSelectors.getAllDiscardPile(state);
      const selId = getDiscardPileId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DiscardPileSelectors.getSelected(state);
      const selId = getDiscardPileId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDiscardPileLoaded() should return the current 'loaded' status", () => {
      const result = DiscardPileSelectors.getDiscardPileLoaded(state);

      expect(result).toBe(true);
    });

    it("getDiscardPileError() should return the current 'error' state", () => {
      const result = DiscardPileSelectors.getDiscardPileError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
