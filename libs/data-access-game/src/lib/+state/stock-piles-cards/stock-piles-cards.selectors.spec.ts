/* eslint-disable no-magic-numbers */
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import {
  createStockPilesCardsEntity,
  StockPilesCardsEntity,
} from './stock-piles-cards.models';
import {
  stockPilesCardsAdapter,
  initialStockPilesCardsState,
  StockPilesCardsPartialState,
} from './stock-piles-cards.reducer';
import * as StockPilesCardsSelectors from './stock-piles-cards.selectors';

describe('StockPilesCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getStockPilesCardsId = (
    it: StockPilesCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: StockPilesCardsPartialState;

  beforeEach(() => {
    state = {
      stockPilesCards: stockPilesCardsAdapter.setAll(
        [
          createStockPilesCardsEntity(
            'PRODUCT-AAA',
            'A',
            ACTION_CARD_INTERFACE_NAME,
            'A'
          ),
          createStockPilesCardsEntity(
            'PRODUCT-BBB',
            'B',
            DEVELOPMENT_CARD_INTERFACE_NAME,
            'B'
          ),
          createStockPilesCardsEntity(
            'PRODUCT-CCC',
            'D',
            ACTION_CARD_INTERFACE_NAME,
            'F'
          ),
        ],
        {
          ...initialStockPilesCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('getAllStockPilesCards()', () => {
    it('should return the list of StockPilesCards', () => {
      const results = StockPilesCardsSelectors.getAllStockPilesCards(state);
      const selId = getStockPilesCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getStockPilesCardsSelected()', () => {
    it('should return the selected Entity', () => {
      const result = StockPilesCardsSelectors.getStockPilesCardsSelected(state);
      const selId = getStockPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getStockPilesCardsLoaded()', () => {
    it("should return the current 'loaded' status", () => {
      const result = StockPilesCardsSelectors.getStockPilesCardsLoaded(state);

      expect(result).toBe(true);
    });
  });

  describe('getStockPilesCardsError()', () => {
    it("should return the current 'error' state", () => {
      const result = StockPilesCardsSelectors.getStockPilesCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });

  describe('getStockPileCardEntityByPivot({ pileId, cardType, cardId })', () => {
    it('should return the Entity for the ids', () => {
      const pileId = 'D';
      const cardType = ACTION_CARD_INTERFACE_NAME;
      const cardId = 'F';
      const result = StockPilesCardsSelectors.getStockPileCardEntityByPivot(
        state,
        { pileId, cardType, cardId }
      );
      const selId = getStockPilesCardsId(result);

      expect(selId).toBe('PRODUCT-CCC');
    });
  });
});
