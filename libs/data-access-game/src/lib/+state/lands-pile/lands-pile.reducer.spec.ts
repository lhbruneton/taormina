import { LandsPileEntity } from './lands-pile.models';
import * as LandsPileActions from './lands-pile.actions';
import { State, initialState, reducer } from './lands-pile.reducer';

describe('LandsPile Reducer', () => {
  const createLandsPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LandsPileEntity);

  beforeEach(() => {});

  describe('valid LandsPile actions', () => {
    it('loadLandsPileSuccess should return set the list of known LandsPile', () => {
      const landsPile = [
        createLandsPileEntity('PRODUCT-AAA'),
        createLandsPileEntity('PRODUCT-zzz'),
      ];
      const action = LandsPileActions.loadLandsPileSuccess({ landsPile });

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
