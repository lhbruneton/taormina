import { DomainColor, LandType } from '@taormina/shared-models';

import { createLandCardsEntity } from '../cards/models/land';
import * as LandsPileCardsActions from './lands-pile-cards.actions';
import {
  initialLandsPileCardsState,
  landsPileCardsReducer,
  LandsPileCardsState,
} from './lands-pile-cards.reducer';

describe('LandsPileCards Reducer', () => {
  beforeEach(() => {});

  describe('valid LandsPileCards actions', () => {
    it('loadLandsPileCardsSuccess should return set the list of known LandsPileCards', () => {
      const landsPileCards = [
        createLandCardsEntity(
          'PRODUCT-AAA',
          LandType.ClayPit,
          0,
          DomainColor.Red
        ),
        createLandCardsEntity(
          'PRODUCT-zzz',
          LandType.Field,
          3,
          DomainColor.Blue
        ),
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
