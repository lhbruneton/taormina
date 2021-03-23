import { Action } from '@ngrx/store';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { createDiscardPileCardsEntity } from './discard-pile-cards.models';
import {
  DiscardPileCardsState,
  initialDiscardPileCardsState,
  discardPileCardsReducer,
} from './discard-pile-cards.reducer';

describe('DiscardPileCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = discardPileCardsReducer(
        initialDiscardPileCardsState,
        action
      );

      expect(result).toBe(initialDiscardPileCardsState);
    });
  });

  describe('loadDiscardPileCardsSuccess', () => {
    it('should set the list of known DiscardPileCards and loaded', () => {
      const newState: DiscardPileCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            cardType: 'TYPE-A',
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            cardType: 'TYPE-z',
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const discardPileCards = [
        createDiscardPileCardsEntity('PRODUCT-AAA', 'TYPE-A', 'A'),
        createDiscardPileCardsEntity('PRODUCT-zzz', 'TYPE-z', 'z'),
      ];
      const action = DiscardPileCardsActions.loadDiscardPileCardsSuccess({
        discardPileCards,
      });

      const state: DiscardPileCardsState = discardPileCardsReducer(
        initialDiscardPileCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('setDiscardPileCardsError', () => {
    it('should set the error', () => {
      const newState: DiscardPileCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: DiscardPileCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = DiscardPileCardsActions.setDiscardPileCardsError({
        error: ERROR_MSG,
      });

      const state: DiscardPileCardsState = discardPileCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
