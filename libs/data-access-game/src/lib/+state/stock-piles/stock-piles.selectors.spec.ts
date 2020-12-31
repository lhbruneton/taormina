import { StockPilesEntity } from './stock-piles.models';
import {
  StockPilesState,
  stockPilesAdapter,
  initialStockPilesState,
} from './stock-piles.reducer';
import * as StockPilesSelectors from './stock-piles.selectors';

describe('StockPiles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getStockPilesId = (it) => it['id'];
  const createStockPilesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StockPilesEntity);

  let state;

  beforeEach(() => {
    state = {
      stockPiles: stockPilesAdapter.setAll(
        [
          createStockPilesEntity('PRODUCT-AAA'),
          createStockPilesEntity('PRODUCT-BBB'),
          createStockPilesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialStockPilesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('StockPiles Selectors', () => {
    it('getAllStockPiles() should return the list of StockPiles', () => {
      const results = StockPilesSelectors.getAllStockPiles(state);
      const selId = getStockPilesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = StockPilesSelectors.getStockPilesSelected(state);
      const selId = getStockPilesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getStockPilesLoaded() should return the current 'loaded' status", () => {
      const result = StockPilesSelectors.getStockPilesLoaded(state);

      expect(result).toBe(true);
    });

    it("getStockPilesError() should return the current 'error' state", () => {
      const result = StockPilesSelectors.getStockPilesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
