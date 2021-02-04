import { Action } from '@ngrx/store';
import { createEventCardsEntity } from '../cards/models/event';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import {
  EventsPileCardsState,
  initialEventsPileCardsState,
  eventsPileCardsReducer,
} from './events-pile-cards.reducer';

describe('EventsPileCards Reducer', () => {
  describe('valid EventsPileCards actions', () => {
    it('loadEventsPileCardsSuccess should set the list of known EventsPileCards', () => {
      const eventsPileCards = [
        createEventCardsEntity('PRODUCT-AAA', 'Some name', []),
        createEventCardsEntity('PRODUCT-zzz', 'Some other name', []),
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
      const action = {} as Action;

      const result = eventsPileCardsReducer(
        initialEventsPileCardsState,
        action
      );

      expect(result).toBe(initialEventsPileCardsState);
    });
  });
});
