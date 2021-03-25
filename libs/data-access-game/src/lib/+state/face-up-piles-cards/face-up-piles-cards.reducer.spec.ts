import { Action } from '@ngrx/store';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { createFaceUpPilesCardsEntity } from './face-up-piles-cards.models';
import {
  faceUpPilesCardsReducer,
  FaceUpPilesCardsState,
  initialFaceUpPilesCardsState,
} from './face-up-piles-cards.reducer';

describe('FaceUpPilesCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = faceUpPilesCardsReducer(
        initialFaceUpPilesCardsState,
        action
      );

      expect(result).toBe(initialFaceUpPilesCardsState);
    });
  });

  describe('loadFaceUpPilesCardsSuccess', () => {
    it('should set the list of known FaceUpPilesCards and loaded', () => {
      const newState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            pileId: 'z',
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const faceUpPilesCards = [
        createFaceUpPilesCardsEntity('PRODUCT-AAA', 'A', 'A'),
        createFaceUpPilesCardsEntity('PRODUCT-zzz', 'z', 'z'),
      ];
      const action = FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess({
        faceUpPilesCards,
      });

      const state: FaceUpPilesCardsState = faceUpPilesCardsReducer(
        initialFaceUpPilesCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('selectFaceUpPileCard', () => {
    it('should select the FaceUpPileCard', () => {
      const newState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        selectedId: 'PRODUCT-AAA',
        initialized: true,
        loaded: false,
      };

      const initialState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = FaceUpPilesCardsActions.selectFaceUpPileCard({
        id: 'PRODUCT-AAA',
      });

      const state: FaceUpPilesCardsState = faceUpPilesCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('unselectFaceUpPileCard', () => {
    it('should unselect the FaceUpPileCard', () => {
      const newState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        selectedId: 'PRODUCT-AAA',
        initialized: true,
        loaded: false,
      };

      const action = FaceUpPilesCardsActions.unselectFaceUpPileCard();

      const state: FaceUpPilesCardsState = faceUpPilesCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('removeFaceUpPileCard', () => {
    it('should remove the FaceUpPileCard from the list', () => {
      const newState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: FaceUpPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-BBB'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
          'PRODUCT-BBB': {
            id: 'PRODUCT-BBB',
            pileId: 'B',
            cardId: 'B',
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = FaceUpPilesCardsActions.removeFaceUpPileCard({
        id: 'PRODUCT-BBB',
      });

      const state: FaceUpPilesCardsState = faceUpPilesCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('setFaceUpPilesCardsError', () => {
    it('should set the error', () => {
      const newState: FaceUpPilesCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: FaceUpPilesCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = FaceUpPilesCardsActions.setFaceUpPilesCardsError({
        error: ERROR_MSG,
      });

      const state: FaceUpPilesCardsState = faceUpPilesCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
