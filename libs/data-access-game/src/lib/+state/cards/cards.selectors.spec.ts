import { CardsEntity, createCardsEntity } from './cards.models';
import { CardsState, cardsAdapter, initialCardsState } from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

describe('Cards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCardsId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      cards: cardsAdapter.setAll(
        [
          createCardsEntity('PRODUCT-AAA'),
          createCardsEntity('PRODUCT-BBB'),
          createCardsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Cards Selectors', () => {
    it('getAllCards() should return the list of Cards', () => {
      const results = CardsSelectors.getAllCards(state);
      const selId = getCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCardsSelected() should return the selected Entity', () => {
      const result = CardsSelectors.getCardsSelected(state);
      const selId = getCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getCardsLoaded() should return the current 'loaded' status", () => {
      const result = CardsSelectors.getCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getCardsError() should return the current 'error' state", () => {
      const result = CardsSelectors.getCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
