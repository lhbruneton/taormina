/* eslint-disable no-magic-numbers */
import {
  createDiscardPileCardsEntity,
  DiscardPileCardsEntity,
} from './discard-pile-cards.models';
import {
  discardPileCardsAdapter,
  DiscardPileCardsPartialState,
  initialDiscardPileCardsState,
} from './discard-pile-cards.reducer';
import * as DiscardPileCardsSelectors from './discard-pile-cards.selectors';

describe('DiscardPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiscardPileCardsId = (
    it: DiscardPileCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: DiscardPileCardsPartialState;

  beforeEach(() => {
    state = {
      discardPileCards: discardPileCardsAdapter.setAll(
        [
          createDiscardPileCardsEntity('PRODUCT-AAA', 'TYPE-A', 'A'),
          createDiscardPileCardsEntity('PRODUCT-BBB', 'TYPE-B', 'B'),
          createDiscardPileCardsEntity('PRODUCT-CCC', 'TYPE-C', 'C'),
        ],
        {
          ...initialDiscardPileCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('getAllDiscardPileCards()', () => {
    it('should return the list of DiscardPileCards', () => {
      const results = DiscardPileCardsSelectors.getAllDiscardPileCards(state);
      const selId = getDiscardPileCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getDiscardPileCardsSelected()', () => {
    it('should return the selected Entity', () => {
      const result = DiscardPileCardsSelectors.getDiscardPileCardsSelected(
        state
      );
      const selId = getDiscardPileCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getDiscardPileCardsLoaded()', () => {
    it("should return the current 'loaded' status", () => {
      const result = DiscardPileCardsSelectors.getDiscardPileCardsLoaded(state);

      expect(result).toBe(true);
    });
  });

  describe('getDiscardPileCardsError()', () => {
    it("should return the current 'error' state", () => {
      const result = DiscardPileCardsSelectors.getDiscardPileCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
