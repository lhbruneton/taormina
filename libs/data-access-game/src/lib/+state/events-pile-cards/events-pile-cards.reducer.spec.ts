import { createCardsEntity } from '../cards/cards.models';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import {
  EventsPileCardsState,
  initialEventsPileCardsState,
  eventsPileCardsReducer,
} from './events-pile-cards.reducer';

describe('EventsPileCards Reducer', () => {
  beforeEach(() => {});

  describe('valid EventsPileCards actions', () => {
    it('loadEventsPileCardsSuccess should return set the list of known EventsPileCards', () => {
      const eventsPileCards = [
        createCardsEntity('PRODUCT-AAA'),
        createCardsEntity('PRODUCT-zzz'),
      ];
      const action = EventsPileCardsActions.loadEventsPileCardsSuccess({
        eventsPileCards,
      });

      const result: EventsPileCardsState = eventsPileCardsReducer(
        initialEventsPileCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = eventsPileCardsReducer(
        initialEventsPileCardsState,
        action
      );

      expect(result).toBe(initialEventsPileCardsState);
    });
  });
});
