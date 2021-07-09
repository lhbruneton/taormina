import { Action } from '@ngrx/store';

import {
  aaaaWarehouseNextToBlueForestDomainCard,
  blueForestDomainCard,
  blueForestId,
  domainsCardsNewGameState,
  domainsCardsNewGameStateEntities,
  domainsCardsSwappedForestAndStoneQuarryRedState,
  redClayPitDomainCard,
  redClayPitId,
  redForestId,
  redStoneQuarryId,
  someDomainsCardsId,
  someOtherDomainsCardsId,
} from '../../../test';
import * as DomainsCardsActions from './domains-cards.actions';
import {
  domainsCardsReducer,
  DomainsCardsState,
  initialDomainsCardsState,
} from './domains-cards.reducer';

describe('DomainsCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = domainsCardsReducer(initialDomainsCardsState, action);

      expect(result).toBe(initialDomainsCardsState);
    });
  });

  describe('setDomainsCardsInitialized', () => {
    it('should set the list of known DomainsCards and initialized', () => {
      const action = DomainsCardsActions.setDomainsCardsInitialized({
        domainsCards: Object.values(domainsCardsNewGameStateEntities),
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialDomainsCardsState,
        action
      );

      expect(state).toEqual(domainsCardsNewGameState);
    });
  });

  describe('updateDomainsCards', () => {
    it('should update the DomainsCards in the list', () => {
      const newState = {
        ...domainsCardsNewGameState,
        entities: {
          ...domainsCardsNewGameState.entities,
          [redClayPitId]: {
            ...redClayPitDomainCard,
            availableResources: 2,
          },
          [blueForestId]: {
            ...blueForestDomainCard,
            availableResources: 0,
            lockedResources: 1,
          },
        },
      };

      const action = DomainsCardsActions.updateDomainsCards({
        updates: [
          {
            id: redClayPitId,
            changes: {
              availableResources: 2,
            },
          },
          {
            id: blueForestId,
            changes: {
              availableResources: 0,
              lockedResources: 1,
            },
          },
        ],
      });

      const state: DomainsCardsState = domainsCardsReducer(
        domainsCardsNewGameState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('updateDomainCard', () => {
    it('should update the DomainCard', () => {
      const newState = {
        ...domainsCardsNewGameState,
        entities: {
          ...domainsCardsNewGameState.entities,
          [blueForestId]: {
            ...blueForestDomainCard,
            availableResources: 0,
            lockedResources: 1,
          },
        },
      };

      const action = DomainsCardsActions.updateDomainCard({
        update: {
          id: blueForestId,
          changes: {
            availableResources: 0,
            lockedResources: 1,
          },
        },
      });

      const state: DomainsCardsState = domainsCardsReducer(
        domainsCardsNewGameState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('addDomainCard', () => {
    it('should add the DomainCard to the list', () => {
      const newState = {
        ...domainsCardsNewGameState,
        ids: [...domainsCardsNewGameState.ids, 'aaaa'],
        entities: {
          ...domainsCardsNewGameState.entities,
          aaaa: aaaaWarehouseNextToBlueForestDomainCard,
        },
      };

      const action = DomainsCardsActions.addDomainCard({
        domainCard: aaaaWarehouseNextToBlueForestDomainCard,
      });

      const state: DomainsCardsState = domainsCardsReducer(
        domainsCardsNewGameState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
  describe('toggleDomainCardSelection', () => {
    describe('add', () => {
      it('should add the DomainCard to the selection', () => {
        const newState = {
          ...domainsCardsNewGameState,
          selectedIds: [someDomainsCardsId, someOtherDomainsCardsId],
        };

        const action = DomainsCardsActions.toggleDomainCardSelection({
          id: someOtherDomainsCardsId,
        });

        const state: DomainsCardsState = domainsCardsReducer(
          { ...domainsCardsNewGameState, selectedIds: [someDomainsCardsId] },
          action
        );

        expect(state).toEqual(newState);
      });
    });

    describe('remove', () => {
      it('should remove the DomainCard from the selection', () => {
        const initialState = {
          ...domainsCardsNewGameState,
          selectedIds: [someDomainsCardsId, someOtherDomainsCardsId],
        };

        const action = DomainsCardsActions.toggleDomainCardSelection({
          id: someOtherDomainsCardsId,
        });

        const state: DomainsCardsState = domainsCardsReducer(
          initialState,
          action
        );

        expect(state).toEqual({
          ...domainsCardsNewGameState,
          selectedIds: [someDomainsCardsId],
        });
      });
    });
  });

  describe('clearDomainCardSelection', () => {
    it('should clear the DomainCard selection', () => {
      const initialState = {
        ...domainsCardsNewGameState,
        selectedIds: [someDomainsCardsId, someOtherDomainsCardsId],
      };

      const action = DomainsCardsActions.clearDomainCardSelection();

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(domainsCardsNewGameState);
    });
  });

  describe('swapSelectedCards', () => {
    it('should swap the selected DomainsCards', () => {
      const initialState = {
        ...domainsCardsNewGameState,
        selectedIds: [redForestId, redStoneQuarryId],
      };

      const action = DomainsCardsActions.swapSelectedCards();

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(domainsCardsSwappedForestAndStoneQuarryRedState());
    });
  });

  describe('setDomainsCardsError', () => {
    it('should set the error', () => {
      const newState = {
        ...domainsCardsNewGameState,
        errorMsg: ERROR_MSG,
      };

      const action = DomainsCardsActions.setDomainsCardsError({
        error: ERROR_MSG,
      });

      const state: DomainsCardsState = domainsCardsReducer(
        domainsCardsNewGameState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
