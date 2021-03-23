import { Action } from '@ngrx/store';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { createLandsPileCardsEntity } from './lands-pile-cards.models';
import {
  initialLandsPileCardsState,
  landsPileCardsReducer,
  LandsPileCardsState,
} from './lands-pile-cards.reducer';

describe('LandsPileCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = landsPileCardsReducer(initialLandsPileCardsState, action);

      expect(result).toBe(initialLandsPileCardsState);
    });
  });

  describe('loadLandsPileCardsSuccess', () => {
    it('should set the list of known LandsPileCards and loaded', () => {
      const newState: LandsPileCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const landsPileCards = [
        createLandsPileCardsEntity('PRODUCT-AAA', 'A'),
        createLandsPileCardsEntity('PRODUCT-zzz', 'z'),
      ];
      const action = LandsPileCardsActions.loadLandsPileCardsSuccess({
        landsPileCards,
      });

      const state: LandsPileCardsState = landsPileCardsReducer(
        initialLandsPileCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('setLandsPileCardsError', () => {
    it('should set the error', () => {
      const newState: LandsPileCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: LandsPileCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = LandsPileCardsActions.setLandsPileCardsError({
        error: ERROR_MSG,
      });

      const state: LandsPileCardsState = landsPileCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
