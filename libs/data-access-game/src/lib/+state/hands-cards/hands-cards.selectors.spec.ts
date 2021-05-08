/* eslint-disable no-magic-numbers */
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { createHandsCardsEntity, HandsCardsEntity } from './hands-cards.models';
import {
  handsCardsAdapter,
  HandsCardsPartialState,
  initialHandsCardsState,
} from './hands-cards.reducer';
import * as HandsCardsSelectors from './hands-cards.selectors';

describe('HandsCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHandsCardsId = (
    it: HandsCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: HandsCardsPartialState;

  beforeEach(() => {
    state = {
      handsCards: handsCardsAdapter.setAll(
        [
          createHandsCardsEntity(
            'PRODUCT-AAA',
            'A',
            DEVELOPMENT_CARD_INTERFACE_NAME,
            'A'
          ),
          createHandsCardsEntity(
            'PRODUCT-BBB',
            'B',
            ACTION_CARD_INTERFACE_NAME,
            'B'
          ),
          createHandsCardsEntity(
            'PRODUCT-CCC',
            'C',
            DEVELOPMENT_CARD_INTERFACE_NAME,
            'C'
          ),
        ],
        {
          ...initialHandsCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('getAllHandsCards()', () => {
    it('should return the list of HandsCards', () => {
      const results = HandsCardsSelectors.getAllHandsCards(state);
      const selId = getHandsCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getHandsCardsSelected()', () => {
    it('should return the selected Entity', () => {
      const result = HandsCardsSelectors.getHandsCardsSelected(state);
      const selId = getHandsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getHandsCardsLoaded()', () => {
    it("should return the current 'loaded' status", () => {
      const result = HandsCardsSelectors.getHandsCardsLoaded(state);

      expect(result).toBe(true);
    });
  });

  describe('getHandsCardsError()', () => {
    it("should return the current 'error' state", () => {
      const result = HandsCardsSelectors.getHandsCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
