import { StockPileCardsEntity } from './stock-pile-cards.models';
import {
  StockPileCardsState,
  stockPileCardsAdapter,
  initialStockPileCardsState,
} from './stock-pile-cards.reducer';
import * as StockPileCardsSelectors from './stock-pile-cards.selectors';

describe('StockPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getStockPileCardsId = (it) => it['id'];
  const createStockPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StockPileCardsEntity);

  let state;

  beforeEach(() => {
    state = {
      stockPileCards: stockPileCardsAdapter.setAll(
        [
          createStockPileCardsEntity('PRODUCT-AAA'),
          createStockPileCardsEntity('PRODUCT-BBB'),
          createStockPileCardsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialStockPileCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('StockPileCards Selectors', () => {
    it('getAllStockPileCards() should return the list of StockPileCards', () => {
      const results = StockPileCardsSelectors.getAllStockPileCards(state);
      const selId = getStockPileCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = StockPileCardsSelectors.getStockPileCardsSelected(state);
      const selId = getStockPileCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getStockPileCardsLoaded() should return the current 'loaded' status", () => {
      const result = StockPileCardsSelectors.getStockPileCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getStockPileCardsError() should return the current 'error' state", () => {
      const result = StockPileCardsSelectors.getStockPileCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
