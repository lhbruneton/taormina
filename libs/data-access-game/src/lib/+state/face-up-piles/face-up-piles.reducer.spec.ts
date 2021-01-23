import { AgglomerationType } from '@taormina/shared-models';

import { createAgglomerationCardsEntity } from '../cards/models/agglomeration';
import * as FaceUpPilesActions from './face-up-piles.actions';
import {
  faceUpPilesReducer,
  FaceUpState,
  initialFaceUpState,
} from './face-up-piles.reducer';

describe('FaceUpPiles Reducer', () => {
  beforeEach(() => {});

  describe('valid FaceUpPiles actions', () => {
    it('loadFaceUpPilesSuccess should return set the list of known AgglomerationCards', () => {
      const agglomerationCards = [
        createAgglomerationCardsEntity('PRODUCT-AAA', AgglomerationType.Road),
        createAgglomerationCardsEntity('PRODUCT-zzz', AgglomerationType.Hamlet),
      ];
      const action = FaceUpPilesActions.loadFaceUpPilesSuccess({
        agglomerationCards,
      });

      const result: FaceUpState = faceUpPilesReducer(
        initialFaceUpState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = faceUpPilesReducer(initialFaceUpState, action);

      expect(result).toBe(initialFaceUpState);
    });
  });
});
