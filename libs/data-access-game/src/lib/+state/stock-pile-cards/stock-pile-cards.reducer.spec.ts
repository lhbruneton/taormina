import { createStockPileCardsEntity } from './stock-pile-cards.models';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import {
  StockPileCardsState,
  initialStockPileCardsState,
  stockPileCardsReducer,
} from './stock-pile-cards.reducer';

describe('StockPileCards Reducer', () => {
  beforeEach(() => {});

  describe('valid StockPileCards actions', () => {
    it('loadStockPileCardsSuccess should return set the list of known StockPileCards', () => {
      const stockPileCards = [
        createStockPileCardsEntity('PRODUCT-AAA', 'A', 'A'),
        createStockPileCardsEntity('PRODUCT-zzz', 'z', 'z'),
      ];
      const action = StockPileCardsActions.loadStockPileCardsSuccess({
        stockPileCards,
      });

      const result: StockPileCardsState = stockPileCardsReducer(
        initialStockPileCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = stockPileCardsReducer(initialStockPileCardsState, action);

      expect(result).toBe(initialStockPileCardsState);
    });
  });
});
