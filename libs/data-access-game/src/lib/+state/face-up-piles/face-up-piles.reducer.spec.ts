import { Action } from '@ngrx/store';
import { AgglomerationType, ResourceType } from '@taormina/shared-models';

import { createAgglomerationCardsEntity } from '../cards/models/agglomeration';
import * as FaceUpPilesActions from './face-up-piles.actions';
import {
  faceUpPilesReducer,
  FaceUpState,
  initialFaceUpState,
} from './face-up-piles.reducer';

describe('FaceUpPiles Reducer', () => {
  describe('valid FaceUpPiles actions', () => {
    it('loadFaceUpPilesSuccess should set the list of known AgglomerationCards', () => {
      const agglomerationCards = [
        createAgglomerationCardsEntity(
          'PRODUCT-AAA',
          new Map([
            [ResourceType.Wood, 1],
            [ResourceType.Clay, 2],
          ]),
          AgglomerationType.Road
        ),
        createAgglomerationCardsEntity(
          'PRODUCT-zzz',
          new Map([
            [ResourceType.Wood, 1],
            [ResourceType.Clay, 1],
            [ResourceType.Wool, 1],
            [ResourceType.Wheat, 1],
          ]),
          AgglomerationType.Hamlet
        ),
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
      const action = {} as Action;

      const result = faceUpPilesReducer(initialFaceUpState, action);

      expect(result).toBe(initialFaceUpState);
    });
  });
});
