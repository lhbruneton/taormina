import { CardsEntity } from '../../model/cards.models';
import * as LandsPileCardsActions from './lands-pile-cards.actions';
import {
  LandsPileCardsState,
  initialLandsPileCardsState,
  landsPileCardsReducer,
} from './lands-pile-cards.reducer';

describe('LandsPileCards Reducer', () => {
  const createLandsPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CardsEntity);

  beforeEach(() => {});

  describe('valid LandsPileCards actions', () => {
    it('loadLandsPileCardsSuccess should return set the list of known LandsPileCards', () => {
      const landsPileCards = [
        createLandsPileCardsEntity('PRODUCT-AAA'),
        createLandsPileCardsEntity('PRODUCT-zzz'),
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
