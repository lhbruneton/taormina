import {
  createFaceUpPilesCardsEntity,
  FaceUpPilesCardsEntity,
} from './face-up-piles-cards.models';
import {
  faceUpPilesCardsAdapter,
  FaceUpPilesCardsPartialState,
  initialFaceUpPilesCardsState,
} from './face-up-piles-cards.reducer';
import * as FaceUpPilesCardsSelectors from './face-up-piles-cards.selectors';

describe('FaceUpPilesCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFaceUpPilesCardsId = (
    it: FaceUpPilesCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: FaceUpPilesCardsPartialState;

  beforeEach(() => {
    state = {
      faceUpPilesCards: faceUpPilesCardsAdapter.setAll(
        [
          createFaceUpPilesCardsEntity('PRODUCT-AAA', 'A', 'A'),
          createFaceUpPilesCardsEntity('PRODUCT-BBB', 'B', 'B'),
          createFaceUpPilesCardsEntity('PRODUCT-BBD', 'B', 'D'),
          createFaceUpPilesCardsEntity('PRODUCT-CCC', 'C', 'C'),
        ],
        {
          ...initialFaceUpPilesCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('FaceUpPilesCards Selectors', () => {
    it('getAllFaceUpPilesCards() should return the list of FaceUpPilesCards', () => {
      const results = FaceUpPilesCardsSelectors.getAllFaceUpPilesCards(state);
      const selId = getFaceUpPilesCardsId(results[1]);

      expect(results.length).toBe(4);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getFaceUpSelected() should return the selected Entity', () => {
      const result = FaceUpPilesCardsSelectors.getFaceUpSelected(state);
      const selId = getFaceUpPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getFaceUpPilesCardsLoaded() should return the current 'loaded' status", () => {
      const result = FaceUpPilesCardsSelectors.getFaceUpPilesCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getFaceUpPilesCardsError() should return the current 'error' state", () => {
      const result = FaceUpPilesCardsSelectors.getFaceUpPilesCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getFaceUpPileCardEntityByPivot({ pileId, cardId }) should return the pivot for the pileId and cardId', () => {
      const result = FaceUpPilesCardsSelectors.getFaceUpPileCardEntityByPivot(
        state,
        {
          pileId: 'B',
          cardId: 'B',
        }
      );
      const selId = getFaceUpPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCardPivotsForPile({ pileId }) should return the pivots for the pileId', () => {
      const results = FaceUpPilesCardsSelectors.getCardPivotsForPile(state, {
        pileId: 'B',
      });
      const selId = getFaceUpPilesCardsId(results[1]);

      expect(results.length).toBe(2);
      expect(selId).toBe('PRODUCT-BBD');
    });

    it('getFirstCardPivotForPile({ pileId }) should return the first pivot for the pileId', () => {
      const result = FaceUpPilesCardsSelectors.getFirstCardPivotForPile(state, {
        pileId: 'B',
      });
      const selId = getFaceUpPilesCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });
});
