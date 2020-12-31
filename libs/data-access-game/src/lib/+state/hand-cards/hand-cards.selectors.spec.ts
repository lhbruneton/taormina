import { HandCardsEntity } from './hand-cards.models';
import {
  HandCardsState,
  handCardsAdapter,
  initialHandCardsState,
} from './hand-cards.reducer';
import * as HandCardsSelectors from './hand-cards.selectors';

describe('HandCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHandCardsId = (it) => it['id'];
  const createHandCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as HandCardsEntity);

  let state;

  beforeEach(() => {
    state = {
      handCards: handCardsAdapter.setAll(
        [
          createHandCardsEntity('PRODUCT-AAA'),
          createHandCardsEntity('PRODUCT-BBB'),
          createHandCardsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialHandCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('HandCards Selectors', () => {
    it('getAllHandCards() should return the list of HandCards', () => {
      const results = HandCardsSelectors.getAllHandCards(state);
      const selId = getHandCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = HandCardsSelectors.getHandCardsSelected(state);
      const selId = getHandCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getHandCardsLoaded() should return the current 'loaded' status", () => {
      const result = HandCardsSelectors.getHandCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getHandCardsError() should return the current 'error' state", () => {
      const result = HandCardsSelectors.getHandCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
