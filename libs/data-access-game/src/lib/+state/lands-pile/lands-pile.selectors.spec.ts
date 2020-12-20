import { LandsPileEntity } from './lands-pile.models';
import { State, landsPileAdapter, initialState } from './lands-pile.reducer';
import * as LandsPileSelectors from './lands-pile.selectors';

describe('LandsPile Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLandsPileId = (it) => it['id'];
  const createLandsPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LandsPileEntity);

  let state;

  beforeEach(() => {
    state = {
      landsPile: landsPileAdapter.setAll(
        [
          createLandsPileEntity('PRODUCT-AAA'),
          createLandsPileEntity('PRODUCT-BBB'),
          createLandsPileEntity('PRODUCT-CCC'),
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

  describe('LandsPile Selectors', () => {
    it('getAllLandsPile() should return the list of LandsPile', () => {
      const results = LandsPileSelectors.getAllLandsPile(state);
      const selId = getLandsPileId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = LandsPileSelectors.getSelected(state);
      const selId = getLandsPileId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLandsPileLoaded() should return the current 'loaded' status", () => {
      const result = LandsPileSelectors.getLandsPileLoaded(state);

      expect(result).toBe(true);
    });

    it("getLandsPileError() should return the current 'error' state", () => {
      const result = LandsPileSelectors.getLandsPileError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
