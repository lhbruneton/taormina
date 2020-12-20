import { DiscardPileEntity } from './discard-pile.models';
import * as DiscardPileActions from './discard-pile.actions';
import { State, initialState, reducer } from './discard-pile.reducer';

describe('DiscardPile Reducer', () => {
  const createDiscardPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiscardPileEntity);

  beforeEach(() => {});

  describe('valid DiscardPile actions', () => {
    it('loadDiscardPileSuccess should return set the list of known DiscardPile', () => {
      const discardPile = [
        createDiscardPileEntity('PRODUCT-AAA'),
        createDiscardPileEntity('PRODUCT-zzz'),
      ];
      const action = DiscardPileActions.loadDiscardPileSuccess({ discardPile });

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
