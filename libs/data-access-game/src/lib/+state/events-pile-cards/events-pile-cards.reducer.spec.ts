import { CardsEntity } from '../../model/cards.models';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import {
  EventsPileCardsState,
  initialEventsPileCardsState,
  eventsPileCardsReducer,
} from './events-pile-cards.reducer';

describe('EventsPileCards Reducer', () => {
  const createEventsPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CardsEntity);

  beforeEach(() => {});

  describe('valid EventsPileCards actions', () => {
    it('loadEventsPileCardsSuccess should return set the list of known EventsPileCards', () => {
      const eventsPileCards = [
        createEventsPileCardsEntity('PRODUCT-AAA'),
        createEventsPileCardsEntity('PRODUCT-zzz'),
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
