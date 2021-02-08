import { DomainColor } from '@taormina/shared-models';

import { createHandsEntity, HandsEntity } from './hands.models';
import {
  handsAdapter,
  HandsPartialState,
  initialHandsState,
} from './hands.reducer';
import * as HandsSelectors from './hands.selectors';

describe('Hands Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getHandsId = (it: HandsEntity | undefined) => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: HandsPartialState;

  beforeEach(() => {
    state = {
      hands: handsAdapter.setAll(
        [
          createHandsEntity('PRODUCT-AAA', DomainColor.Red),
          createHandsEntity('PRODUCT-BBB', DomainColor.Blue),
          createHandsEntity('PRODUCT-CCC', DomainColor.Red),
        ],
        {
          ...initialHandsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Hands Selectors', () => {
    it('getAllHands() should return the list of Hands', () => {
      const results = HandsSelectors.getAllHands(state);
      const selId = getHandsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getHandsSelected() should return the selected Entity', () => {
      const result = HandsSelectors.getHandsSelected(state);
      const selId = getHandsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getHandsLoaded() should return the current 'loaded' status", () => {
      const result = HandsSelectors.getHandsLoaded(state);

      expect(result).toBe(true);
    });

    it("getHandsError() should return the current 'error' state", () => {
      const result = HandsSelectors.getHandsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
