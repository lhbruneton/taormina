import { HandsEntity } from './hands.models';
import * as HandsActions from './hands.actions';
import { HandsState, initialHandsState, handsReducer } from './hands.reducer';

describe('Hands Reducer', () => {
  const createHandsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HandsEntity);

  beforeEach(() => {});

  describe('valid Hands actions', () => {
    it('loadHandsSuccess should return set the list of known Hands', () => {
      const hands = [
        createHandsEntity('PRODUCT-AAA'),
        createHandsEntity('PRODUCT-zzz'),
      ];
      const action = HandsActions.loadHandsSuccess({ hands });

      const result: HandsState = handsReducer(initialHandsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = handsReducer(initialHandsState, action);

      expect(result).toBe(initialHandsState);
    });
  });
});
