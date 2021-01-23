import { AgglomerationType } from '@taormina/shared-models';

import { createAgglomerationCardsEntity } from '../cards/models/agglomeration';
import {
  faceUpPilesAdapter,
  initialFaceUpState,
} from './face-up-piles.reducer';
import * as FaceUpPilesSelectors from './face-up-piles.selectors';

describe('FaceUpPiles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getFaceUpPilesId = (it) => it['id'];

  let state;

  beforeEach(() => {
    state = {
      faceUpPiles: faceUpPilesAdapter.setAll(
        [
          createAgglomerationCardsEntity('PRODUCT-AAA', AgglomerationType.Road),
          createAgglomerationCardsEntity(
            'PRODUCT-BBB',
            AgglomerationType.Hamlet
          ),
          createAgglomerationCardsEntity('PRODUCT-CCC', AgglomerationType.Town),
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

  describe('FaceUpPiles Selectors', () => {
    it('getAllFaceUpPiles() should return the list of FaceUpPiles', () => {
      const results = FaceUpPilesSelectors.getAllFaceUpPiles(state);
      const selId = getFaceUpPilesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getFaceUpSelected() should return the selected Entity', () => {
      const result = FaceUpPilesSelectors.getFaceUpSelected(state);
      const selId = getFaceUpPilesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getFaceUpPilesLoaded() should return the current 'loaded' status", () => {
      const result = FaceUpPilesSelectors.getFaceUpPilesLoaded(state);

      expect(result).toBe(true);
    });

    it("getFaceUpPilesError() should return the current 'error' state", () => {
      const result = FaceUpPilesSelectors.getFaceUpPilesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
