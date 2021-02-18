import { Action } from '@ngrx/store';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { createDiscardPileCardsEntity } from './discard-pile-cards.models';
import {
  DiscardPileCardsState,
  initialDiscardPileCardsState,
  discardPileCardsReducer,
} from './discard-pile-cards.reducer';

describe('DiscardPileCards Reducer', () => {
  describe('valid DiscardPileCards actions', () => {
    it('loadDiscardPileCardsSuccess should set the list of known DiscardPileCards', () => {
      const discardPileCards = [
        createDiscardPileCardsEntity('PRODUCT-AAA', 'TYPE-A', 'A'),
        createDiscardPileCardsEntity('PRODUCT-zzz', 'TYPE-z', 'z'),
      ];
      const action = DiscardPileCardsActions.loadDiscardPileCardsSuccess({
        discardPileCards,
      });

      const result: DiscardPileCardsState = discardPileCardsReducer(
        initialDiscardPileCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

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
});
