import { DiscardPileCardsEntity } from './discard-pile-cards.models';
import {
  DiscardPileCardsState,
  discardPileCardsAdapter,
  initialDiscardPileCardsState,
} from './discard-pile-cards.reducer';
import * as DiscardPileCardsSelectors from './discard-pile-cards.selectors';

describe('DiscardPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDiscardPileCardsId = (it) => it['id'];
  const createDiscardPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiscardPileCardsEntity);

  let state;

  beforeEach(() => {
    state = {
      discardPileCards: discardPileCardsAdapter.setAll(
        [
          createDiscardPileCardsEntity('PRODUCT-AAA'),
          createDiscardPileCardsEntity('PRODUCT-BBB'),
          createDiscardPileCardsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialDiscardPileCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('DiscardPileCards Selectors', () => {
    it('getAllDiscardPileCards() should return the list of DiscardPileCards', () => {
      const results = DiscardPileCardsSelectors.getAllDiscardPileCards(state);
      const selId = getDiscardPileCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = DiscardPileCardsSelectors.getDiscardPileCardsSelected(
        state
      );
      const selId = getDiscardPileCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDiscardPileCardsLoaded() should return the current 'loaded' status", () => {
      const result = DiscardPileCardsSelectors.getDiscardPileCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getDiscardPileCardsError() should return the current 'error' state", () => {
      const result = DiscardPileCardsSelectors.getDiscardPileCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
