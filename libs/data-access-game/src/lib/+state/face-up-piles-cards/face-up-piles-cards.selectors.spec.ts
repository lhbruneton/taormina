import {
  createFaceUpPilesCardsEntity,
  FaceUpPilesCardsEntity,
} from './face-up-piles-cards.models';
import {
  faceUpPilesCardsAdapter,
  FaceUpPilesCardsPartialState,
  initialFaceUpState,
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
          createFaceUpPilesCardsEntity('PRODUCT-CCC', 'C', 'C'),
        ],
        {
          ...initialFaceUpState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('FaceUpPilesCards Selectors', () => {
    it('getAllFaceUpPilesCards() should return the list of FaceUpPilesCards', () => {
      const results = FaceUpPilesCardsSelectors.getAllFaceUpPilesCards(state);
      const selId = getFaceUpPilesCardsId(results[1]);

      expect(results.length).toBe(3);
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
  });
});
