import { Action } from '@ngrx/store';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { createFaceUpPilesCardsEntity } from './face-up-piles-cards.models';
import {
  faceUpPilesCardsReducer,
  FaceUpState,
  initialFaceUpState,
} from './face-up-piles-cards.reducer';

describe('FaceUpPilesCards Reducer', () => {
  describe('valid FaceUpPilesCards actions', () => {
    it('loadFaceUpPilesCardsSuccess should set the list of known AgglomerationCards', () => {
      const agglomerationCards = [
        createFaceUpPilesCardsEntity('PRODUCT-AAA', 'A', 'A'),
        createFaceUpPilesCardsEntity('PRODUCT-zzz', 'z', 'z'),
      ];
      const action = FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess({
        agglomerationCards,
      });

      const result: FaceUpState = faceUpPilesCardsReducer(
        initialFaceUpState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = faceUpPilesCardsReducer(initialFaceUpState, action);

      expect(result).toBe(initialFaceUpState);
    });
  });
});
