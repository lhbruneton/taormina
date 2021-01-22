import { createDomainCardsEntity } from './domain-cards.models';
import {
  domainCardsAdapter,
  initialDomainCardsState,
} from './domain-cards.reducer';
import * as DomainCardsSelectors from './domain-cards.selectors';

describe('DomainCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDomainCardsId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      domainCards: domainCardsAdapter.setAll(
        [
          createDomainCardsEntity('PRODUCT-AAA', 'A', 'A', 0, 0),
          createDomainCardsEntity('PRODUCT-BBB', 'B', 'B', 0, 0),
          createDomainCardsEntity('PRODUCT-CCC', 'C', 'C', 0, 0),
        ],
        {
          ...initialDomainCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('DomainCards Selectors', () => {
    it('getAllDomainCards() should return the list of DomainCards', () => {
      const results = DomainCardsSelectors.getAllDomainCards(state);
      const selId = getDomainCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDomainCardsSelected() should return the selected Entity', () => {
      const result = DomainCardsSelectors.getDomainCardsSelected(state);
      const selId = getDomainCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDomainCardsLoaded() should return the current 'loaded' status", () => {
      const result = DomainCardsSelectors.getDomainCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getDomainCardsError() should return the current 'error' state", () => {
      const result = DomainCardsSelectors.getDomainCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
