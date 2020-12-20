import { StockPilesEntity } from './stock-piles.models';
import * as StockPilesActions from './stock-piles.actions';
import { State, initialState, reducer } from './stock-piles.reducer';

describe('StockPiles Reducer', () => {
  const createStockPilesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as StockPilesEntity);

  beforeEach(() => {});

  describe('valid StockPiles actions', () => {
    it('loadStockPilesSuccess should return set the list of known StockPiles', () => {
      const stockPiles = [
        createStockPilesEntity('PRODUCT-AAA'),
        createStockPilesEntity('PRODUCT-zzz'),
      ];
      const action = StockPilesActions.loadStockPilesSuccess({ stockPiles });

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
