/* eslint-disable no-magic-numbers */
import {
  ID_CLAY_PIT_RED,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_FOREST_BLUE,
  ID_GOLD_MINE_BLUE,
  ID_GOLD_MINE_RED,
  ID_PASTURE_BLUE,
  ID_PASTURE_RED,
} from '@taormina/shared-constants';
import { MasteryPointsType } from '@taormina/shared-models';

import {
  blueForestId,
  domainsCardsAuspiciousYearTwoRedOneBlueState,
  domainsCardsCommunityCenterNextToBlueForestState,
  domainsCardsFourTradeRedThreeTradeBlueState,
  domainsCardsNewGameState,
  domainsCardsOneStrengthRedTwoStrengthBlueState,
  domainsCardsOneTradeRedTwoTradeBlueState,
  domainsCardsSawmillNextToBlueForestState,
  domainsCardsSevenStrengthRedThreeStrengthBlueState,
  domainsCardsThreeStrengthRedSevenStrengthBlueState,
  domainsCardsThreeStrengthRedThreeStrengthBlueState,
  domainsCardsThreeTradeRedFourTradeBlueState,
  domainsCardsThreeTradeRedThreeTradeBlueState,
  domainsCardsTwoCelebrationRedFiveCelebrationBlueState,
  domainsCardsTwoShipsRedState,
  domainsCardsWarehouseNextToBlueForestState,
  redClayPitDomainCard,
  redClayPitId,
  someDomainsCardsId,
  someOtherDomainsCardsId,
} from '../../../test';
import { DomainsCardsEntity } from './domains-cards.models';
import { DomainsCardsPartialState } from './domains-cards.reducer';
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
      domainsCards: domainsCardsNewGameState,
    };
  });

  describe('getAllDomainsCards()', () => {
    it('should return the list of DomainsCards', () => {
      const results = DomainsCardsSelectors.getAllDomainsCards(state);
      expect(results.length).toBe(30);
    });
  });

  describe('getDomainsCardsSelected()', () => {
    beforeEach(() => {
      state = {
        domainsCards: {
          ...domainsCardsNewGameState,
          selectedIds: [someDomainsCardsId, someOtherDomainsCardsId],
        },
      };
    });
    it('should return the selected Entities', () => {
      const result = DomainsCardsSelectors.getDomainsCardsSelected(state);
      const selId0 = getDomainsCardsId(result[0]);
      const selId1 = getDomainsCardsId(result[1]);

      expect(selId0).toBe(someDomainsCardsId);
      expect(selId1).toBe(someOtherDomainsCardsId);
    });
  });

  describe('getDomainsCardsLoaded()', () => {
    beforeEach(() => {
      state = {
        domainsCards: { ...domainsCardsNewGameState, loaded: true },
      };
    });
    it("should return the current 'loaded' status", () => {
      const result = DomainsCardsSelectors.getDomainsCardsLoaded(state);

      expect(result).toBe(true);
    });
  });

  describe('getDomainsCardsError()', () => {
    beforeEach(() => {
      state = {
        domainsCards: { ...domainsCardsNewGameState, errorMsg: ERROR_MSG },
      };
    });
    it("should return the current 'error' state", () => {
      const result = DomainsCardsSelectors.getDomainsCardsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });

  describe('getLandCardPivotById({ id })', () => {
    it('should return the blue forest domain card', () => {
      const result =
        DomainsCardsSelectors.getLandCardPivotById(blueForestId)(state);
      const selId = getDomainsCardsId(result);

      expect(selId).toBe(blueForestId);
    });
  });

  describe('getLandCardPivotWithLockedResources()', () => {
    beforeEach(() => {
      state = {
        domainsCards: {
          ...domainsCardsNewGameState,
          entities: {
            ...domainsCardsNewGameState.entities,
            [redClayPitId]: {
              ...redClayPitDomainCard,
              lockedResources: 1,
            },
          },
        },
      };
    });
    it('should return the red clay pit domain card', () => {
      const results =
        DomainsCardsSelectors.getLandCardPivotWithLockedResources(state);
      const selId = getDomainsCardsId(results[0]);

      expect(selId).toBe(redClayPitId);
    });
  });

  describe('getDomainMinCol({ domainId })', () => {
    it('should return the lowest column number for the domain', () => {
      const result =
        DomainsCardsSelectors.getDomainMinCol(ID_DOMAIN_BLUE)(state);

      expect(result).toBe(-2);
    });
  });

  describe('getDomainMaxCol({ domainId })', () => {
    it('should return the highest column number for the domain', () => {
      const result =
        DomainsCardsSelectors.getDomainMaxCol(ID_DOMAIN_BLUE)(state);

      expect(result).toBe(2);
    });
  });

  describe('getDomainMinRow({ domainId })', () => {
    it('should return the lowest row number for the domain', () => {
      const result =
        DomainsCardsSelectors.getDomainMinRow(ID_DOMAIN_BLUE)(state);

      expect(result).toBe(-1);
    });
  });

  describe('getDomainMaxRow({ domainId })', () => {
    it('should return the highest row number for the domain', () => {
      const result =
        DomainsCardsSelectors.getDomainMaxRow(ID_DOMAIN_BLUE)(state);

      expect(result).toBe(1);
    });
  });

  describe('Increase resources on production die', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsSawmillNextToBlueForestState(),
      };
    });

    describe('getLandCardsPivotsIncreaseOneProduction({ die })', () => {
      it('should return the red clay pit for die 3', () => {
        const results =
          DomainsCardsSelectors.getLandCardsPivotsIncreaseOneProduction(3)(
            state
          );
        const selId = getDomainsCardsId(results[0]);

        expect(selId).toBe(redClayPitId);
      });
    });

    describe('getLandCardsPivotsIncreaseTwoProduction({ die })', () => {
      it('should return the blue forest for die 3', () => {
        const results =
          DomainsCardsSelectors.getLandCardsPivotsIncreaseTwoProduction(3)(
            state
          );
        const selId = getDomainsCardsId(results[0]);

        expect(selId).toBe(blueForestId);
      });
    });
  });

  describe('getMasteryDomainForType({ type })', () => {
    describe('trade', () => {
      describe('below threshold', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsOneTradeRedTwoTradeBlueState(),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Trade
          )(state);
          expect(result).toBe(undefined);
        });
      });

      describe('ex aequo', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsThreeTradeRedThreeTradeBlueState(),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Trade
          )(state);
          expect(result).toBe(undefined);
        });
      });

      describe('red mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsFourTradeRedThreeTradeBlueState(),
          };
        });

        it('should return the red domain id', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Trade
          )(state);
          expect(result).toBe(ID_DOMAIN_RED);
        });
      });

      describe('blue mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsThreeTradeRedFourTradeBlueState(),
          };
        });

        it('should return the blue domain id', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Trade
          )(state);
          expect(result).toBe(ID_DOMAIN_BLUE);
        });
      });
    });

    describe('strength', () => {
      describe('below threshold', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsOneStrengthRedTwoStrengthBlueState(),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Strength
          )(state);
          expect(result).toBe(undefined);
        });
      });

      describe('ex aequo', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsThreeStrengthRedThreeStrengthBlueState(),
          };
        });

        it('should return undefined', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Strength
          )(state);
          expect(result).toBe(undefined);
        });
      });

      describe('red mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsSevenStrengthRedThreeStrengthBlueState(),
          };
        });

        it('should return the red domain id', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Strength
          )(state);
          expect(result).toBe(ID_DOMAIN_RED);
        });
      });

      describe('blue mastery', () => {
        beforeEach(() => {
          state = {
            domainsCards: domainsCardsThreeStrengthRedSevenStrengthBlueState(),
          };
        });

        it('should return the blue domain id', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(
            MasteryPointsType.Strength
          )(state);
          expect(result).toBe(ID_DOMAIN_BLUE);
        });
      });
    });
  });

  describe('Warehouse resource protection', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsWarehouseNextToBlueForestState(),
      };
    });

    describe('getDomainResourceCountSeenByThieves', () => {
      it(`should return 5 resources seen by thieves for the red domain
          and 4 resources seen by thieves for the blue domain`, () => {
        const result =
          DomainsCardsSelectors.getDomainResourceCountSeenByThieves(state);
        expect(result.length).toBe(2);
        expect(result[0]).toBe(5);
        expect(result[1]).toBe(4);
      });
    });

    describe('getDomainUnprotectedGoldMinesAndPastures', () => {
      it(`should return the gold mine and the pasture for the red domain
          and only the pasture for the blue domain`, () => {
        const results =
          DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures(state);
        expect(results.length).toBe(2);

        const cardIdGoldMineRed = results[0][0]?.cardId;
        const cardIdPastureRed = results[0][1]?.cardId;

        expect(results[0].length).toBe(2);
        expect(cardIdGoldMineRed).toBe(ID_GOLD_MINE_RED);
        expect(cardIdPastureRed).toBe(ID_PASTURE_RED);

        const cardIdPastureBlue = results[1][0]?.cardId;

        expect(results[1].length).toBe(1);
        expect(cardIdPastureBlue).toBe(ID_PASTURE_BLUE);
      });
    });
  });

  describe('getLandCardsPivotsIncreaseAuspiciousYear', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsAuspiciousYearTwoRedOneBlueState(),
      };
    });
    it('should return the clay pit and the pasture for the red domain with count 2', () => {
      const results =
        DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear(state);
      const cardIdClayPitRed = results[1][0]?.cardId;
      const cardIdPastureRed = results[1][1]?.cardId;

      expect(results.length).toBe(4);
      expect(results[1].length).toBe(2);
      expect(cardIdClayPitRed).toBe(ID_CLAY_PIT_RED);
      expect(cardIdPastureRed).toBe(ID_PASTURE_RED);
    });

    it('should return the forest and the gold mine for the blue domain with count 1', () => {
      const results =
        DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear(state);
      const cardIdForestBlue = results[0][0]?.cardId;
      const cardIdGoldMineBlue = results[0][1]?.cardId;

      expect(results.length).toBe(4);
      expect(results[0].length).toBe(2);
      expect(cardIdForestBlue).toBe(ID_FOREST_BLUE);
      expect(cardIdGoldMineBlue).toBe(ID_GOLD_MINE_BLUE);
    });
  });

  describe('getCardsVictoryPointsForDomain()', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsNewGameState,
      };
    });
    it('should return two victory points for the two initial hamlets', () => {
      const result =
        DomainsCardsSelectors.getCardsVictoryPointsForDomain(ID_DOMAIN_RED)(
          state
        );

      expect(result).toBe(2);
    });
  });

  describe('getMerchantShipCountForDomain()', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsTwoShipsRedState(),
      };
    });
    it('should return a two ships count for the red domain', () => {
      const result =
        DomainsCardsSelectors.getMerchantShipCountForDomain(ID_DOMAIN_RED)(
          state
        );

      expect(result).toBe(2);
    });
  });

  describe('getCelebrationPointsForDomain()', () => {
    beforeEach(() => {
      state = {
        domainsCards: domainsCardsTwoCelebrationRedFiveCelebrationBlueState(),
      };
    });
    it(`should return two celebration points for the red domain
        and five celebration points for the blue domain`, () => {
      const resultRed =
        DomainsCardsSelectors.getCelebrationPointsForDomain(ID_DOMAIN_RED)(
          state
        );
      const resultBlue =
        DomainsCardsSelectors.getCelebrationPointsForDomain(ID_DOMAIN_BLUE)(
          state
        );

      expect(resultRed).toBe(2);
      expect(resultBlue).toBe(5);
    });
  });

  describe('hasDomainCommunityCenter()', () => {
    describe('new game state', () => {
      beforeEach(() => {
        state = {
          domainsCards: domainsCardsNewGameState,
        };
      });
      it('should return false', () => {
        const result =
          DomainsCardsSelectors.hasDomainCommunityCenter(ID_DOMAIN_BLUE)(state);

        expect(result).toBe(false);
      });
    });
    describe('community center state', () => {
      beforeEach(() => {
        state = {
          domainsCards: domainsCardsCommunityCenterNextToBlueForestState(),
        };
      });
      it('should return true', () => {
        const result =
          DomainsCardsSelectors.hasDomainCommunityCenter(ID_DOMAIN_BLUE)(state);

        expect(result).toBe(true);
      });
    });
  });
});
