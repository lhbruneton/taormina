import { createHandsEntity } from './hands.models';
import * as HandsActions from './hands.actions';
import { HandsState, initialHandsState, handsReducer } from './hands.reducer';
import { DomainColor } from '@taormina/shared-models';

describe('Hands Reducer', () => {
  beforeEach(() => {});

  describe('valid Hands actions', () => {
    it('loadHandsSuccess should return set the list of known Hands', () => {
      const hands = [
        createHandsEntity('PRODUCT-AAA', DomainColor.Red),
        createHandsEntity('PRODUCT-zzz', DomainColor.Blue),
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
