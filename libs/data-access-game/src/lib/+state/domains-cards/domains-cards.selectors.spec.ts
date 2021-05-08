/* eslint-disable no-magic-numbers */
import {
  ID_CLAY_PIT_BLUE,
  ID_CLAY_PIT_RED,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_FOREST_BLUE,
  ID_GOLD_MINE_BLUE,
  ID_PASTURE_BLUE,
} from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  LAND_CARD_INTERFACE_NAME,
  MasteryPointsType,
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
            2
          ),
          createDomainsCardsEntity(
            'PRODUCT-BBB',
            ID_DOMAIN_BLUE,
            LAND_CARD_INTERFACE_NAME,
            'LAND_1',
            0,
            -2,
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

  describe('getAllDomainsCards()', () => {
    it('should return the list of DomainsCards', () => {
      const results = DomainsCardsSelectors.getAllDomainsCards(state);
      const selId = getDomainsCardsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getDomainsCardsSelected()', () => {
    it('should return the selected Entity', () => {
      const result = DomainsCardsSelectors.getDomainsCardsSelected(state);
      const selId = getDomainsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getDomainsCardsLoaded()', () => {
    it("should return the current 'loaded' status", () => {
      const result = DomainsCardsSelectors.getDomainsCardsLoaded(state);

      expect(result).toBe(true);
    });
  });

  describe('getDomainsCardsError()', () => {
    it("should return the current 'error' state", () => {
      const result = DomainsCardsSelectors.getDomainsCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });

  describe('getLandCardPivotById({ id })', () => {
    it('should return the pivot for the id', () => {
      const result = DomainsCardsSelectors.getLandCardPivotById(state, {
        id: 'PRODUCT-BBB',
      });
      const selId = getDomainsCardsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getLandCardPivotWithLockedResources()', () => {
    it('should return the pivot for the id', () => {
      const results = DomainsCardsSelectors.getLandCardPivotWithLockedResources(
        state
      );
      const selId = getDomainsCardsId(results[0]);

      expect(selId).toBe('PRODUCT-BBB');
    });
  });

  describe('getDomainMinCol({ domainId })', () => {
    it('should return the lowest column number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMinCol(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(0);
    });
  });

  describe('getDomainMaxCol({ domainId })', () => {
    it('should return the highest column number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMaxCol(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(1);
    });
  });

  describe('getDomainMinRow({ domainId })', () => {
    it('should return the lowest row number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMinRow(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(-2);
    });
  });

  describe('getDomainMaxRow({ domainId })', () => {
    it('should return the highest row number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMaxRow(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(0);
    });
  });

  describe('getLandCardsPivotsIncreaseOneProduction({ die })', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsAdapter.setAll(
          [
            createDomainsCardsEntity(
              'aaaa',
              ID_DOMAIN_RED,
              LAND_CARD_INTERFACE_NAME,
              ID_CLAY_PIT_RED,
              -2,
              1
            ),
            createDomainsCardsEntity(
              'bbbb',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_FOREST_BLUE,
              -2,
              -1
            ),
            createDomainsCardsEntity(
              'cccc',
              ID_DOMAIN_BLUE,
              DEVELOPMENT_CARD_INTERFACE_NAME,
              'BUILDING_2', // Sawmill
              -1,
              -1
            ),
          ],
          {
            ...initialDomainsCardsState,
          }
        ),
      };
    });

    it('should return the red clay pit', () => {
      const results = DomainsCardsSelectors.getLandCardsPivotsIncreaseOneProduction(
        state,
        {
          die: 3,
        }
      );
      const selId = getDomainsCardsId(results[0]);

      expect(selId).toBe('aaaa');
    });

    it('should return the blue forest', () => {
      const results = DomainsCardsSelectors.getLandCardsPivotsIncreaseTwoProduction(
        state,
        {
          die: 3,
        }
      );
      const selId = getDomainsCardsId(results[0]);

      expect(selId).toBe('bbbb');
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
            type: MasteryPointsType.Trade,
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
            type: MasteryPointsType.Trade,
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
            type: MasteryPointsType.Trade,
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
            type: MasteryPointsType.Trade,
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
            type: MasteryPointsType.Strength,
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
            type: MasteryPointsType.Strength,
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
            type: MasteryPointsType.Strength,
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
            type: MasteryPointsType.Strength,
          });
          expect(result).toBe(ID_DOMAIN_BLUE);
        });
      });
    });
  });

  describe('getDomainResourceCountSeenByThieves', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsAdapter.setAll(
          [
            createDomainsCardsEntity(
              'aaaa',
              ID_DOMAIN_RED,
              LAND_CARD_INTERFACE_NAME,
              ID_CLAY_PIT_RED,
              -2,
              -1,
              1
            ),
            createDomainsCardsEntity(
              'bbbb',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_CLAY_PIT_BLUE,
              -2,
              -1,
              1
            ),
            createDomainsCardsEntity(
              'cccc',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_FOREST_BLUE,
              -2,
              1,
              1
            ),
            createDomainsCardsEntity(
              'dddd',
              ID_DOMAIN_BLUE,
              DEVELOPMENT_CARD_INTERFACE_NAME,
              'BUILDING_6',
              -1,
              2
            ),
            createDomainsCardsEntity(
              'eeee',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_GOLD_MINE_BLUE,
              0,
              1,
              0
            ),
            createDomainsCardsEntity(
              'ffff',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_PASTURE_BLUE,
              2,
              1,
              1
            ),
          ],
          {
            ...initialDomainsCardsState,
          }
        ),
      };
    });

    it('should return resource count seen by thieves', () => {
      const result = DomainsCardsSelectors.getDomainResourceCountSeenByThieves(
        state,
        {
          domainId: ID_DOMAIN_BLUE,
        }
      );
      expect(result).toBe(2);
    });
  });

  describe('getDomainUnprotectedGoldMinesAndPastures', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsAdapter.setAll(
          [
            createDomainsCardsEntity(
              'aaaa',
              ID_DOMAIN_RED,
              LAND_CARD_INTERFACE_NAME,
              ID_CLAY_PIT_RED,
              -2,
              -1,
              1
            ),
            createDomainsCardsEntity(
              'bbbb',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_CLAY_PIT_BLUE,
              -2,
              -1,
              1
            ),
            createDomainsCardsEntity(
              'cccc',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_FOREST_BLUE,
              -2,
              1,
              1
            ),
            createDomainsCardsEntity(
              'dddd',
              ID_DOMAIN_BLUE,
              DEVELOPMENT_CARD_INTERFACE_NAME,
              'BUILDING_6',
              -1,
              1
            ),
            createDomainsCardsEntity(
              'eeee',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_GOLD_MINE_BLUE,
              0,
              1,
              0
            ),
            createDomainsCardsEntity(
              'ffff',
              ID_DOMAIN_BLUE,
              LAND_CARD_INTERFACE_NAME,
              ID_PASTURE_BLUE,
              2,
              1,
              1
            ),
          ],
          {
            ...initialDomainsCardsState,
          }
        ),
      };
    });

    it('should return unprotected gold mines and pastures', () => {
      const results = DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures(
        state,
        {
          domainId: ID_DOMAIN_BLUE,
        }
      );
      const id = getDomainsCardsId(results[0]);

      expect(results.length).toBe(1);
      expect(id).toBe('ffff');
    });
  });
});
