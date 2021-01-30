import { AgglomerationType, ResourceType } from '@taormina/shared-models';

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
          createAgglomerationCardsEntity(
            'PRODUCT-AAA',
            new Map([
              [ResourceType.Wood, 1],
              [ResourceType.Clay, 2],
            ]),
            AgglomerationType.Road
          ),
          createAgglomerationCardsEntity(
            'PRODUCT-BBB',
            new Map([
              [ResourceType.Wood, 1],
              [ResourceType.Clay, 1],
              [ResourceType.Wool, 1],
              [ResourceType.Wheat, 1],
            ]),
            AgglomerationType.Hamlet
          ),
          createAgglomerationCardsEntity(
            'PRODUCT-CCC',
            new Map([
              [ResourceType.Wheat, 2],
              [ResourceType.Stone, 3],
            ]),
            AgglomerationType.Town
          ),
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
