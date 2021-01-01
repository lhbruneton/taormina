import { CardsEntity } from '../cards/cards.models';
import {
  EventsPileCardsState,
  eventsPileCardsAdapter,
  initialEventsPileCardsState,
} from './events-pile-cards.reducer';
import * as EventsPileCardsSelectors from './events-pile-cards.selectors';

describe('EventsPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEventsPileCardsId = (it) => it['id'];
  const createEventsPileCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CardsEntity);

  let state;

  beforeEach(() => {
    state = {
      eventsPileCards: eventsPileCardsAdapter.setAll(
        [
          createEventsPileCardsEntity('PRODUCT-AAA'),
          createEventsPileCardsEntity('PRODUCT-BBB'),
          createEventsPileCardsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialEventsPileCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('EventsPileCards Selectors', () => {
    it('getAllEventsPileCards() should return the list of EventsPileCards', () => {
      const results = EventsPileCardsSelectors.getAllEventsPileCards(state);
      const selId = getEventsPileCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EventsPileCardsSelectors.getEventsPileCardsSelected(state);
      const selId = getEventsPileCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getEventsPileCardsLoaded() should return the current 'loaded' status", () => {
      const result = EventsPileCardsSelectors.getEventsPileCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getEventsPileCardsError() should return the current 'error' state", () => {
      const result = EventsPileCardsSelectors.getEventsPileCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
