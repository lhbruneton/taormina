/* eslint-disable no-magic-numbers */
import {
  createAgglomerationPilesCardsEntity,
  AgglomerationPilesCardsEntity,
} from './agglomeration-piles-cards.models';
import {
  agglomerationPilesCardsAdapter,
  AgglomerationPilesCardsPartialState,
  initialAgglomerationPilesCardsState,
} from './agglomeration-piles-cards.reducer';
import * as AgglomerationPilesCardsSelectors from './agglomeration-piles-cards.selectors';

describe('AgglomerationPilesCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAgglomerationPilesCardsId = (
    it: AgglomerationPilesCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: AgglomerationPilesCardsPartialState;

  beforeEach(() => {
    state = {
      agglomerationPilesCards: agglomerationPilesCardsAdapter.setAll(
        [
          createAgglomerationPilesCardsEntity('PRODUCT-AAA', 'A', 'A'),
          createAgglomerationPilesCardsEntity('PRODUCT-BBB', 'B', 'B'),
          createAgglomerationPilesCardsEntity('PRODUCT-BBD', 'B', 'D'),
          createAgglomerationPilesCardsEntity('PRODUCT-CCC', 'C', 'C'),
        ],
        {
          ...initialAgglomerationPilesCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('getAllAgglomerationPilesCards()', () => {
    it('should return the list of AgglomerationPilesCards', () => {
      const results =
        AgglomerationPilesCardsSelectors.getAllAgglomerationPilesCards(state);
      const selId = getAgglomerationPilesCardsId(results[1]);

      expect(results.length).toBe(4);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getAgglomerationSelected()', () => {
    it('should return the selected Entity', () => {
      const result =
        AgglomerationPilesCardsSelectors.getAgglomerationSelected(state);
      const selId = getAgglomerationPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getAgglomerationPilesCardsLoaded()', () => {
    it("should return the current 'loaded' status", () => {
      const result =
        AgglomerationPilesCardsSelectors.getAgglomerationPilesCardsLoaded(
          state
        );

      expect(result).toBe(true);
    });
  });

  describe('getAgglomerationPilesCardsError()', () => {
    it("should return the current 'error' state", () => {
      const result =
        AgglomerationPilesCardsSelectors.getAgglomerationPilesCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });

  describe('getAgglomerationPileCardEntityByPivot({ pileId, cardId })', () => {
    it('should return the pivot for the pileId and cardId', () => {
      const result =
        AgglomerationPilesCardsSelectors.getAgglomerationPileCardEntityByPivot(
          'B',
          'B'
        )(state);
      const selId = getAgglomerationPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getCardPivotsForPile({ pileId })', () => {
    it('should return the pivots for the pileId', () => {
      const results =
        AgglomerationPilesCardsSelectors.getCardPivotsForPile('B')(state);
      const selId = getAgglomerationPilesCardsId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('PRODUCT-BBD');
    });
  });

  describe('getFirstCardPivotForPile({ pileId })', () => {
    it('should return the first pivot for the pileId', () => {
      const result =
        AgglomerationPilesCardsSelectors.getFirstCardPivotForPile('B')(state);
      const selId = getAgglomerationPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });
});
