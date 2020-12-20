import { EventsPileEntity } from './events-pile.models';
import { State, eventsPileAdapter, initialState } from './events-pile.reducer';
import * as EventsPileSelectors from './events-pile.selectors';

describe('EventsPile Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEventsPileId = (it) => it['id'];
  const createEventsPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventsPileEntity);

  let state;

  beforeEach(() => {
    state = {
      eventsPile: eventsPileAdapter.setAll(
        [
          createEventsPileEntity('PRODUCT-AAA'),
          createEventsPileEntity('PRODUCT-BBB'),
          createEventsPileEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('EventsPile Selectors', () => {
    it('getAllEventsPile() should return the list of EventsPile', () => {
      const results = EventsPileSelectors.getAllEventsPile(state);
      const selId = getEventsPileId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EventsPileSelectors.getSelected(state);
      const selId = getEventsPileId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getEventsPileLoaded() should return the current 'loaded' status", () => {
      const result = EventsPileSelectors.getEventsPileLoaded(state);

      expect(result).toBe(true);
    });

    it("getEventsPileError() should return the current 'error' state", () => {
      const result = EventsPileSelectors.getEventsPileError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
