import { Action } from '@ngrx/store';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { createLandsPileCardsEntity } from './lands-pile-cards.models';
import {
  initialLandsPileCardsState,
  landsPileCardsReducer,
  LandsPileCardsState,
} from './lands-pile-cards.reducer';

describe('LandsPileCards Reducer', () => {
  describe('valid LandsPileCards actions', () => {
    it('loadLandsPileCardsSuccess should set the list of known LandsPileCards', () => {
      const landsPileCards = [
        createLandsPileCardsEntity('PRODUCT-AAA', 'A'),
        createLandsPileCardsEntity('PRODUCT-zzz', 'z'),
      ];
      const action = LandsPileCardsActions.loadLandsPileCardsSuccess({
        landsPileCards,
      });

      const result: LandsPileCardsState = landsPileCardsReducer(
        initialLandsPileCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = landsPileCardsReducer(initialLandsPileCardsState, action);

      expect(result).toBe(initialLandsPileCardsState);
    });
  });
});
