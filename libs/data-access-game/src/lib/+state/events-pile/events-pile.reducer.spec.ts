import { EventsPileEntity } from './events-pile.models';
import * as EventsPileActions from './events-pile.actions';
import { State, initialState, reducer } from './events-pile.reducer';

describe('EventsPile Reducer', () => {
  const createEventsPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventsPileEntity);

  beforeEach(() => {});

  describe('valid EventsPile actions', () => {
    it('loadEventsPileSuccess should return set the list of known EventsPile', () => {
      const eventsPile = [
        createEventsPileEntity('PRODUCT-AAA'),
        createEventsPileEntity('PRODUCT-zzz'),
      ];
      const action = EventsPileActions.loadEventsPileSuccess({ eventsPile });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
