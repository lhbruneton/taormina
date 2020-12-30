import { StockPileCardsEntity } from './stock-pile-cards.models';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import { State, initialState, reducer } from './stock-pile-cards.reducer';

describe('StockPileCards Reducer', () => {
  const createStockPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StockPileCardsEntity);

  beforeEach(() => {});

  describe('valid StockPileCards actions', () => {
    it('loadStockPileCardsSuccess should return set the list of known StockPileCards', () => {
      const stockPileCards = [
        createStockPileCardsEntity('PRODUCT-AAA'),
        createStockPileCardsEntity('PRODUCT-zzz'),
      ];
      const action = StockPileCardsActions.loadStockPileCardsSuccess({
        stockPileCards,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
