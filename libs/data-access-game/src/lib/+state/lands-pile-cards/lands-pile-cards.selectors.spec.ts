import { LandType } from '@taormina/shared-models';

import { createLandCardsEntity, LandCardsEntity } from '../cards/models/land';
import {
  initialLandsPileCardsState,
  landsPileCardsAdapter,
  LandsPileCardsPartialState,
} from './lands-pile-cards.reducer';
import * as LandsPileCardsSelectors from './lands-pile-cards.selectors';

describe('LandsPileCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLandsPileCardsId = (it: LandCardsEntity | undefined) => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: LandsPileCardsPartialState;

  beforeEach(() => {
    state = {
      landsPileCards: landsPileCardsAdapter.setAll(
        [
          createLandCardsEntity('PRODUCT-AAA', LandType.ClayPit, 0, 1),
          createLandCardsEntity('PRODUCT-BBB', LandType.Forest, 1, 4),
          createLandCardsEntity('PRODUCT-CCC', LandType.GoldMine, 2, 2),
        ],
        {
          ...initialLandsPileCardsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
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
