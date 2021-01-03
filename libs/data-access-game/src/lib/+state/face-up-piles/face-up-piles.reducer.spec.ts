import { createFaceUpPilesEntity } from './face-up-piles.models';
import * as FaceUpPilesActions from './face-up-piles.actions';
import {
  FaceUpState,
  initialFaceUpState,
  faceUpPilesReducer,
} from './face-up-piles.reducer';

describe('FaceUpPiles Reducer', () => {
  beforeEach(() => {});

  describe('valid FaceUpPiles actions', () => {
    it('loadFaceUpPilesSuccess should return set the list of known FaceUpPiles', () => {
      const faceUpPiles = [
        createFaceUpPilesEntity('PRODUCT-AAA'),
        createFaceUpPilesEntity('PRODUCT-zzz'),
      ];
      const action = FaceUpPilesActions.loadFaceUpPilesSuccess({ faceUpPiles });

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
