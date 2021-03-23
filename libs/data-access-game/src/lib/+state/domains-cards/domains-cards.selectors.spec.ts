import { ID_DOMAIN_BLUE, ID_DOMAIN_RED } from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  LAND_CARD_INTERFACE_NAME,
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
  const getDomainsCardsId = (
    it: DomainsCardsEntity | undefined
  ): string | undefined => {
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
            ID_DOMAIN_RED,
            AGGLOMERATION_CARD_INTERFACE_NAME,
            'ROAD_1',
            0,
            0
          ),
          createDomainsCardsEntity(
            'PRODUCT-BBB',
            ID_DOMAIN_BLUE,
            LAND_CARD_INTERFACE_NAME,
            'LAND_1',
            0,
            0,
            0,
            1
          ),
          createDomainsCardsEntity(
            'PRODUCT-CCC',
            ID_DOMAIN_BLUE,
            LAND_CARD_INTERFACE_NAME,
            'LAND_3',
            0,
            0
          ),
        ],
        {
          ...initialDomainsCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
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

    it('getLandCardsPivotsForDie({ die }) should return the pivot for the land card with the right die', () => {
      const result = DomainsCardsSelectors.getLandCardsPivotsForDie(state, {
        die: 1,
      });
      const selId = getDomainsCardsId(result[0]);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getLandCardPivotById({ id }) should return the pivot for the id', () => {
      const result = DomainsCardsSelectors.getLandCardPivotById(state, {
        id: 'PRODUCT-BBB',
      });
      const selId = getDomainsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getLandCardPivotWithLockedResources() should return the pivot for the id', () => {
      const result = DomainsCardsSelectors.getLandCardPivotWithLockedResources(
        state
      );
      const selId = getDomainsCardsId(result[0]);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });
});
