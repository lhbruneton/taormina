import { createStockPileCardsEntity } from './stock-pile-cards.models';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import {
  StockPileCardsState,
  initialStockPileCardsState,
  stockPileCardsReducer,
} from './stock-pile-cards.reducer';

describe('StockPileCards Reducer', () => {
  beforeEach(() => {});

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = stockPileCardsReducer(initialStockPileCardsState, action);

      expect(result).toBe(initialStockPileCardsState);
    });
  });

  describe('loadStockPileCardsSuccess', () => {
    it('should set the list of known StockPileCards and loaded', () => {
      const newState: StockPileCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': { id: 'PRODUCT-AAA', stockPileId: 'A', cardId: 'A' },
          'PRODUCT-zzz': { id: 'PRODUCT-zzz', stockPileId: 'z', cardId: 'z' },
        },
        initialized: false,
        loaded: true,
      };

      const stockPileCards = [
        createStockPileCardsEntity('PRODUCT-AAA', 'A', 'A'),
        createStockPileCardsEntity('PRODUCT-zzz', 'z', 'z'),
      ];
      const action = StockPileCardsActions.loadStockPileCardsSuccess({
        stockPileCards,
      });

      const state: StockPileCardsState = stockPileCardsReducer(
        initialStockPileCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('removeStockPileCards', () => {
    it('should remove StockPileCards from the list', () => {
      const newState: StockPileCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': { id: 'PRODUCT-AAA', stockPileId: 'A', cardId: 'A' },
          'PRODUCT-zzz': { id: 'PRODUCT-zzz', stockPileId: 'z', cardId: 'z' },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: StockPileCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-BBB', 'PRODUCT-CCC', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': { id: 'PRODUCT-AAA', stockPileId: 'A', cardId: 'A' },
          'PRODUCT-BBB': { id: 'PRODUCT-BBB', stockPileId: 'B', cardId: 'B' },
          'PRODUCT-CCC': { id: 'PRODUCT-CCC', stockPileId: 'C', cardId: 'C' },
          'PRODUCT-zzz': { id: 'PRODUCT-zzz', stockPileId: 'z', cardId: 'z' },
        },
        initialized: true,
        loaded: false,
      };

      const action = StockPileCardsActions.removeStockPileCards({
        stockPileCardIds: ['PRODUCT-BBB', 'PRODUCT-CCC'],
      });

      const state: StockPileCardsState = stockPileCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
