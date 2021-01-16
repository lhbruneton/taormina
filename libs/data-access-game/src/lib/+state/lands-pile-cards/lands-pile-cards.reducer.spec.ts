import { createCardsEntity } from '../cards/cards.models';
import * as LandsPileCardsActions from './lands-pile-cards.actions';
import {
  LandsPileCardsState,
  initialLandsPileCardsState,
  landsPileCardsReducer,
} from './lands-pile-cards.reducer';

describe('LandsPileCards Reducer', () => {
  beforeEach(() => {});

  describe('valid LandsPileCards actions', () => {
    it('loadLandsPileCardsSuccess should return set the list of known LandsPileCards', () => {
      const landsPileCards = [
        createCardsEntity('PRODUCT-AAA'),
        createCardsEntity('PRODUCT-zzz'),
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
      const action = {} as any;

      const result = landsPileCardsReducer(initialLandsPileCardsState, action);

      expect(result).toBe(initialLandsPileCardsState);
    });
  });
});
