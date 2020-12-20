import { FaceUpPilesEntity } from './face-up-piles.models';
import * as FaceUpPilesActions from './face-up-piles.actions';
import { State, initialState, reducer } from './face-up-piles.reducer';

describe('FaceUpPiles Reducer', () => {
  const createFaceUpPilesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as FaceUpPilesEntity);

  beforeEach(() => {});

  describe('valid FaceUpPiles actions', () => {
    it('loadFaceUpPilesSuccess should return set the list of known FaceUpPiles', () => {
      const faceUpPiles = [
        createFaceUpPilesEntity('PRODUCT-AAA'),
        createFaceUpPilesEntity('PRODUCT-zzz'),
      ];
      const action = FaceUpPilesActions.loadFaceUpPilesSuccess({ faceUpPiles });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
