import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import {
  createDomainsCardsEntity,
  DomainsCardsEntity,
} from './domains-cards.models';
import {
  domainsCardsAdapter,
  DomainsCardsPartialState,
  initialDomainsCardsState,
} from './domains-cards.reducer';
import * as DomainsCardsSelectors from './domains-cards.selectors';

describe('DomainsCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDomainsCardsId = (it: DomainsCardsEntity | undefined) => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: DomainsCardsPartialState;

  beforeEach(() => {
    state = {
      domainsCards: domainsCardsAdapter.setAll(
        [
          createDomainsCardsEntity(
            'PRODUCT-AAA',
            'A',
            AGGLOMERATION_CARD_INTERFACE_NAME,
            'A',
            0,
            0
          ),
          createDomainsCardsEntity(
            'PRODUCT-BBB',
            'B',
            DEVELOPMENT_CARD_INTERFACE_NAME,
            'B',
            0,
            0
          ),
          createDomainsCardsEntity(
            'PRODUCT-CCC',
            'C',
            AGGLOMERATION_CARD_INTERFACE_NAME,
            'C',
            0,
            0
          ),
        ],
        {
          ...initialDomainsCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('DomainsCards Selectors', () => {
    it('getAllDomainsCards() should return the list of DomainsCards', () => {
      const results = DomainsCardsSelectors.getAllDomainsCards(state);
      const selId = getDomainsCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDomainsCardsSelected() should return the selected Entity', () => {
      const result = DomainsCardsSelectors.getDomainsCardsSelected(state);
      const selId = getDomainsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDomainsCardsLoaded() should return the current 'loaded' status", () => {
      const result = DomainsCardsSelectors.getDomainsCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getDomainsCardsError() should return the current 'error' state", () => {
      const result = DomainsCardsSelectors.getDomainsCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
