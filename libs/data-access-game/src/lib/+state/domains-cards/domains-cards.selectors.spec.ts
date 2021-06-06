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
  domainsCardsWarehouseNextToBlueForestState,
  redClayPitDomainCard,
  redClayPitId,
  someDomainsCardsId,
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
          selectedId: someDomainsCardsId,
        },
      };
    });
    it('should return the selected Entity', () => {
      const result = DomainsCardsSelectors.getDomainsCardsSelected(state);
      const selId = getDomainsCardsId(result);

      expect(selId).toBe(someDomainsCardsId);
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
      const result = DomainsCardsSelectors.getLandCardPivotById(state, {
        id: blueForestId,
      });
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
      const result = DomainsCardsSelectors.getDomainMinCol(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(-2);
    });
  });

  describe('getDomainMaxCol({ domainId })', () => {
    it('should return the highest column number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMaxCol(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(2);
    });
  });

  describe('getDomainMinRow({ domainId })', () => {
    it('should return the lowest row number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMinRow(state, {
        domainId: ID_DOMAIN_BLUE,
      });

      expect(result).toBe(-1);
    });
  });

  describe('getDomainMaxRow({ domainId })', () => {
    it('should return the highest row number for the domain', () => {
      const result = DomainsCardsSelectors.getDomainMaxRow(state, {
        domainId: ID_DOMAIN_BLUE,
      });

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
          DomainsCardsSelectors.getLandCardsPivotsIncreaseOneProduction(state, {
            die: 3,
          });
        const selId = getDomainsCardsId(results[0]);

        expect(selId).toBe(redClayPitId);
      });
    });

    describe('getLandCardsPivotsIncreaseTwoProduction({ die })', () => {
      it('should return the blue forest for die 3', () => {
        const results =
          DomainsCardsSelectors.getLandCardsPivotsIncreaseTwoProduction(state, {
            die: 3,
          });
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
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: MasteryPointsType.Trade,
          });
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
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: MasteryPointsType.Trade,
          });
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
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: MasteryPointsType.Trade,
          });
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
            domainsCards: domainsCardsOneStrengthRedTwoStrengthBlueState(),
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
            domainsCards: domainsCardsThreeStrengthRedThreeStrengthBlueState(),
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
            domainsCards: domainsCardsSevenStrengthRedThreeStrengthBlueState(),
          };
        });

        it('should return the red domain id', () => {
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: MasteryPointsType.Strength,
          });
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
          const result = DomainsCardsSelectors.getMasteryDomainForType(state, {
            type: MasteryPointsType.Strength,
          });
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
      it('should return 5 resources seen by thieves for the red domain', () => {
        const result =
          DomainsCardsSelectors.getDomainResourceCountSeenByThieves(state, {
            domainId: ID_DOMAIN_RED,
          });
        expect(result).toBe(5);
      });

      it('should return 4 resources seen by thieves for the blue domain', () => {
        const result =
          DomainsCardsSelectors.getDomainResourceCountSeenByThieves(state, {
            domainId: ID_DOMAIN_BLUE,
          });
        expect(result).toBe(4);
      });
    });

    describe('getDomainUnprotectedGoldMinesAndPastures', () => {
      it('should return the gold mine and the pasture for the red domain', () => {
        const results =
          DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures(
            state,
            {
              domainId: ID_DOMAIN_RED,
            }
          );
        const cardIdGoldMineRed = results[0]?.cardId;
        const cardIdPastureRed = results[1]?.cardId;

        expect(results.length).toBe(2);
        expect(cardIdGoldMineRed).toBe(ID_GOLD_MINE_RED);
        expect(cardIdPastureRed).toBe(ID_PASTURE_RED);
      });

      it('should return only the pasture for the blue domain', () => {
        const results =
          DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures(
            state,
            {
              domainId: ID_DOMAIN_BLUE,
            }
          );
        const cardIdPastureBlue = results[0]?.cardId;

        expect(results.length).toBe(1);
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
        DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear(state, {
          count: 2,
        });
      const cardIdClayPitRed = results[0]?.cardId;
      const cardIdPastureRed = results[1]?.cardId;

      expect(results.length).toBe(2);
      expect(cardIdClayPitRed).toBe(ID_CLAY_PIT_RED);
      expect(cardIdPastureRed).toBe(ID_PASTURE_RED);
    });

    it('should return the forest and the gold mine for the blue domain with count 1', () => {
      const results =
        DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear(state, {
          count: 1,
        });
      const cardIdForestBlue = results[0]?.cardId;
      const cardIdGoldMineBlue = results[1]?.cardId;

      expect(results.length).toBe(2);
      expect(cardIdForestBlue).toBe(ID_FOREST_BLUE);
      expect(cardIdGoldMineBlue).toBe(ID_GOLD_MINE_BLUE);
    });
  });
});
