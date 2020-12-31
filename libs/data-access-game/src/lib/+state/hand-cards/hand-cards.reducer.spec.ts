import { HandCardsEntity } from './hand-cards.models';
import * as HandCardsActions from './hand-cards.actions';
import {
  HandCardsState,
  initialHandCardsState,
  handCardsReducer,
} from './hand-cards.reducer';

describe('HandCards Reducer', () => {
  const createHandCardsEntity = (id: string, handId = '', cardId = '') =>
    ({
      id,
      handId: handId || `handId-${id}`,
      cardId: cardId || `cardId-${id}`,
    } as HandCardsEntity);

  beforeEach(() => {});

  describe('valid HandCards actions', () => {
    it('loadHandCardsSuccess should return set the list of known HandCards', () => {
      const handCards = [
        createHandCardsEntity('PRODUCT-AAA'),
        createHandCardsEntity('PRODUCT-zzz'),
      ];
      const action = HandCardsActions.loadHandCardsSuccess({ handCards });

      const result: HandCardsState = handCardsReducer(
        initialHandCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = handCardsReducer(initialHandCardsState, action);

      expect(result).toBe(initialHandCardsState);
    });
  });
});
