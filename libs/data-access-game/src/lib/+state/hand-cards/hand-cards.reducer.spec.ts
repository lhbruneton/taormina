import { createHandCardsEntity } from './hand-cards.models';
import * as HandCardsActions from './hand-cards.actions';
import {
  HandCardsState,
  initialHandCardsState,
  handCardsReducer,
} from './hand-cards.reducer';
import { Action } from '@ngrx/store';

describe('HandCards Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = handCardsReducer(initialHandCardsState, action);

      expect(result).toBe(initialHandCardsState);
    });
  });

  describe('loadHandCardsSuccess', () => {
    it('should set the list of known HandCards and loaded', () => {
      const handCards = [
        createHandCardsEntity('PRODUCT-AAA', 'A', 'A'),
        createHandCardsEntity('PRODUCT-zzz', 'z', 'z'),
      ];
      const action = HandCardsActions.loadHandCardsSuccess({ handCards });

      const result: HandCardsState = handCardsReducer(
        initialHandCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('addHandCards', () => {
    it('should add HandCards to the list', () => {
      const newState: HandCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz', 'PRODUCT-BBB', 'PRODUCT-CCC'],
        entities: {
          'PRODUCT-AAA': { id: 'PRODUCT-AAA', handId: 'A', cardId: 'A' },
          'PRODUCT-zzz': { id: 'PRODUCT-zzz', handId: 'z', cardId: 'z' },
          'PRODUCT-BBB': { id: 'PRODUCT-BBB', handId: 'B', cardId: 'B' },
          'PRODUCT-CCC': { id: 'PRODUCT-CCC', handId: 'C', cardId: 'C' },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: HandCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': { id: 'PRODUCT-AAA', handId: 'A', cardId: 'A' },
          'PRODUCT-zzz': { id: 'PRODUCT-zzz', handId: 'z', cardId: 'z' },
        },
        initialized: true,
        loaded: false,
      };

      const action = HandCardsActions.addHandCards({
        handCards: [
          { id: 'PRODUCT-BBB', handId: 'B', cardId: 'B' },
          { id: 'PRODUCT-CCC', handId: 'C', cardId: 'C' },
        ],
      });

      const state: HandCardsState = handCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
});
