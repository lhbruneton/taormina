/* eslint-disable no-magic-numbers */
import {
  createLandsPileCardsEntity,
  LandsPileCardsEntity,
} from './lands-pile-cards.models';
import {
  initialLandsPileCardsState,
  landsPileCardsAdapter,
  LandsPileCardsPartialState,
} from './lands-pile-cards.reducer';
import * as LandsPileCardsSelectors from './lands-pile-cards.selectors';

describe('LandsPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLandsPileCardsId = (
    it: LandsPileCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: LandsPileCardsPartialState;

  beforeEach(() => {
    state = {
      landsPileCards: landsPileCardsAdapter.setAll(
        [
          createLandsPileCardsEntity('PRODUCT-AAA', 'A'),
          createLandsPileCardsEntity('PRODUCT-BBB', 'B'),
          createLandsPileCardsEntity('PRODUCT-CCC', 'C'),
        ],
        {
          ...initialLandsPileCardsState,
          selectedId: 'PRODUCT-BBB',
          errorMsg: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('LandsPileCards Selectors', () => {
    it('getAllLandsPileCards() should return the list of LandsPileCards', () => {
      const results = LandsPileCardsSelectors.getAllLandsPileCards(state);
      const selId = getLandsPileCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getLandsPileCardsSelected() should return the selected Entity', () => {
      const result = LandsPileCardsSelectors.getLandsPileCardsSelected(state);
      const selId = getLandsPileCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLandsPileCardsLoaded() should return the current 'loaded' status", () => {
      const result = LandsPileCardsSelectors.getLandsPileCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getLandsPileCardsError() should return the current 'error' state", () => {
      const result = LandsPileCardsSelectors.getLandsPileCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
