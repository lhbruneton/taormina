import { ID_DOMAIN_BLUE, ID_DOMAIN_RED } from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  LAND_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

import {
  createDomainsCardsEntity,
  DomainsCardsEntity,
} from './domains-cards.models';
import {
  domainsCardsAdapter,
  DomainsCardsPartialState,
  initialDomainsCardsState,
} from './domains-cards.reducer';
import * as DomainsCardsSelectors from './domains-cards.selectors';

describe('DomainsCards Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDomainsCardsId = (
    it: DomainsCardsEntity | undefined
  ): string | undefined => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: DomainsCardsPartialState;

  describe('DomainsCards Selectors', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsAdapter.setAll(
          [
            createDomainsCardsEntity(
              'PRODUCT-AAA',
              ID_DOMAIN_RED,
              AGGLOMERATION_CARD_INTERFACE_NAME,
              'ROAD_1',
              -1,
              0
            ),
            createDomainsCardsEntity(
              'PRODUCT-BBB',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              'LAND_1',
              0,
              0,
              0,
              1
            ),
            createDomainsCardsEntity(
              'PRODUCT-CCC',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              'LAND_3',
              1,
              0
            ),
          ],
          {
            ...initialDomainsCardsState,
            selectedId: 'PRODUCT-BBB',
            errorMsg: ERROR_MSG,
            loaded: true,
          }
        ),
      };
    });

    it('getAllDomainsCards() should return the list of DomainsCards', () => {
      const results = DomainsCardsSelectors.getAllDomainsCards(state);
      const selId = getDomainsCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDomainsCardsSelected() should return the selected Entity', () => {
      const result = DomainsCardsSelectors.getDomainsCardsSelected(state);
      const selId = getDomainsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDomainsCardsLoaded() should return the current 'loaded' status", () => {
      const result = DomainsCardsSelectors.getDomainsCardsLoaded(state);

      expect(result).toBe(true);
    });

    it("getDomainsCardsError() should return the current 'error' state", () => {
      const result = DomainsCardsSelectors.getDomainsCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });

    it('getLandCardsPivotsForDie({ die }) should return the pivot for the land card with the right die', () => {
      const result = DomainsCardsSelectors.getLandCardsPivotsForDie(state, {
        die: 1,
      });
      const selId = getDomainsCardsId(result[0]);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getLandCardPivotById({ id }) should return the pivot for the id', () => {
      const result = DomainsCardsSelectors.getLandCardPivotById(state, {
        id: 'PRODUCT-BBB',
      });
      const selId = getDomainsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getLandCardPivotWithLockedResources() should return the pivot for the id', () => {
      const result = DomainsCardsSelectors.getLandCardPivotWithLockedResources(
        state
      );
      const selId = getDomainsCardsId(result[0]);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDomainMinCol({ domainId }) should return the lowest column number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMinCol(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(0);
    });

    it('getDomainMaxCol({ domainId }) should return the highest column number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMaxCol(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(1);
    });
  });

  describe('getMasteryDomainForType({ type })', () => {
    describe('trade', () => {
      describe('below threshold', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_8', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_9', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_10', // Toll bridge
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'trade',
          });
          expect(result).toBe(undefined);
        });
      });

      describe('ex aequo', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_8', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_10', // Toll bridge
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'dddd',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_2',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'eeee',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_9', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'ffff',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_4',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'gggg',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_5',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'hhhh',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_6',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'trade',
          });
          expect(result).toBe(undefined);
        });
      });

      describe('red mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_8', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_10', // Toll bridge
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'dddd',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_2',
                  0,
                  0
                ),

                createDomainsCardsEntity(
                  'eeee',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_3',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'ffff',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_9', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'gggg',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_4',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'hhhh',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_5',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'iiii',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_6',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return red', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'trade',
          });
          expect(result).toBe(ID_DOMAIN_RED);
        });
      });

      describe('blue mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_8', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_10', // Toll bridge
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'dddd',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_2',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'eeee',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'BUILDING_9', // Market
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'ffff',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_4',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'gggg',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_5',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'hhhh',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_6',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'iiii',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'SHIP_7',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return blue', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'trade',
          });
          expect(result).toBe(ID_DOMAIN_BLUE);
        });
      });
    });

    describe('strength', () => {
      describe('below threshold', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_2',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'strength',
          });
          expect(result).toBe(undefined);
        });
      });

      describe('ex aequo', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_2',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_3',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'dddd',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_4',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'strength',
          });
          expect(result).toBe(undefined);
        });
      });

      describe('red mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_2',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_6',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'dddd',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_3',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'eeee',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_4',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return red', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'strength',
          });
          expect(result).toBe(ID_DOMAIN_RED);
        });
      });

      describe('blue mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsAdapter.setAll(
              [
                createDomainsCardsEntity(
                  'aaaa',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_1',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'bbbb',
                  ID_DOMAIN_RED,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_2',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'cccc',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_3',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'dddd',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_4',
                  0,
                  0
                ),
                createDomainsCardsEntity(
                  'eeee',
                  ID_DOMAIN_BLUE,
                  DEVELOPMENT_CARD_INTERFACE_NAME,
                  'WARRIOR_6',
                  0,
                  0
                ),
              ],
              {
                ...initialDomainsCardsState,
              }
            ),
          };
        });

        it('should return blue', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: 'strength',
          });
          expect(result).toBe(ID_DOMAIN_BLUE);
        });
      });
    });
  });
});
