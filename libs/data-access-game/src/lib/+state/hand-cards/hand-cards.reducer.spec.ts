import { HandCardsEntity } from './hand-cards.models';
import * as HandCardsActions from './hand-cards.actions';
import { State, initialState, reducer } from './hand-cards.reducer';

describe('HandCards Reducer', () => {
  const createHandCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HandCardsEntity);

  beforeEach(() => {});

  describe('valid HandCards actions', () => {
    it('loadHandCardsSuccess should return set the list of known HandCards', () => {
      const handCards = [
        createHandCardsEntity('PRODUCT-AAA'),
        createHandCardsEntity('PRODUCT-zzz'),
      ];
      const action = HandCardsActions.loadHandCardsSuccess({ handCards });

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
