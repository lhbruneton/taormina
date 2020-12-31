import { DiscardPileCardsEntity } from './discard-pile-cards.models';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import {
  DiscardPileCardsState,
  initialDiscardPileCardsState,
  discardPileCardsReducer,
} from './discard-pile-cards.reducer';

describe('DiscardPileCards Reducer', () => {
  const createDiscardPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiscardPileCardsEntity);

  beforeEach(() => {});

  describe('valid DiscardPileCards actions', () => {
    it('loadDiscardPileCardsSuccess should return set the list of known DiscardPileCards', () => {
      const discardPileCards = [
        createDiscardPileCardsEntity('PRODUCT-AAA'),
        createDiscardPileCardsEntity('PRODUCT-zzz'),
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
      const action = {} as any;

      const result = discardPileCardsReducer(
        initialDiscardPileCardsState,
        action
      );

      expect(result).toBe(initialDiscardPileCardsState);
    });
  });
});
