/* eslint-disable no-magic-numbers */
import {
  createEventsPileCardsEntity,
  EventsPileCardsEntity,
} from './events-pile-cards.models';
import {
  eventsPileCardsAdapter,
  EventsPileCardsPartialState,
  initialEventsPileCardsState,
} from './events-pile-cards.reducer';
import * as EventsPileCardsSelectors from './events-pile-cards.selectors';

describe('EventsPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEventsPileCardsId = (
    it: EventsPileCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: EventsPileCardsPartialState;

  beforeEach(() => {
    state = {
      eventsPileCards: eventsPileCardsAdapter.setAll(
        [
          createEventsPileCardsEntity('PRODUCT-AAA', 'A'),
          createEventsPileCardsEntity('PRODUCT-BBB', 'B'),
          createEventsPileCardsEntity('PRODUCT-CCC', 'C'),
        ],
        {
          ...initialEventsPileCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('getAllEventsPileCards()', () => {
    it('should return the list of EventsPileCards', () => {
      const results = EventsPileCardsSelectors.getAllEventsPileCards(state);
      const selId = getEventsPileCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getEventsPileCardsSelected()', () => {
    it('should return the selected Entity', () => {
      const result = EventsPileCardsSelectors.getEventsPileCardsSelected(state);
      const selId = getEventsPileCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getEventsPileCardsLoaded()', () => {
    it("should return the current 'loaded' status", () => {
      const result = EventsPileCardsSelectors.getEventsPileCardsLoaded(state);

      expect(result).toBe(true);
    });
  });

  describe('getEventsPileCardsError()', () => {
    it("should return the current 'error' state", () => {
      const result = EventsPileCardsSelectors.getEventsPileCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
