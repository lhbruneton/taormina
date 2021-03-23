import { Action } from '@ngrx/store';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import * as DomainsCardsActions from './domains-cards.actions';
import { createDomainsCardsEntity } from './domains-cards.models';
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

  describe('loadDomainsCardsSuccess', () => {
    it('should set the list of known DomainsCards and loaded', () => {
      const newState: DomainsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            domainId: 'z',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'z',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        initialized: false,
        loaded: true,
      };

      const domainsCards = [
        createDomainsCardsEntity(
          'PRODUCT-AAA',
          'A',
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'A',
          0,
          0
        ),
        createDomainsCardsEntity(
          'PRODUCT-zzz',
          'z',
          AGGLOMERATION_CARD_INTERFACE_NAME,
          'z',
          0,
          0
        ),
      ];
      const action = DomainsCardsActions.loadDomainsCardsSuccess({
        domainsCards,
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialDomainsCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('updateDomainsCards', () => {
    it('should update the DomainsCards in the list', () => {
      const newState: DomainsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 1,
            lockedResources: 0,
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            domainId: 'z',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'z',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 1,
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: DomainsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            domainId: 'z',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'z',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = DomainsCardsActions.updateDomainsCards({
        updates: [
          {
            id: 'PRODUCT-AAA',
            changes: {
              availableResources: 1,
            },
          },
          {
            id: 'PRODUCT-zzz',
            changes: {
              lockedResources: 1,
            },
          },
        ],
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('updateDomainCard', () => {
    it('should update the DomainCard', () => {
      const newState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 1,
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 1,
            lockedResources: 0,
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = DomainsCardsActions.updateDomainCard({
        update: {
          id: 'PRODUCT-AAA',
          changes: {
            availableResources: 0,
            lockedResources: 1,
          },
        },
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('addDomainCard', () => {
    it('should add the DomainCard to the list', () => {
      const newState: DomainsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-BBB'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
          'PRODUCT-BBB': {
            id: 'PRODUCT-BBB',
            domainId: 'B',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'B',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = DomainsCardsActions.addDomainCard({
        domainCard: {
          id: 'PRODUCT-BBB',
          domainId: 'B',
          cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
          cardId: 'B',
          col: 0,
          row: 0,
          availableResources: 0,
          lockedResources: 0,
        },
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('selectDomainCard', () => {
    it('should select the DomainCard', () => {
      const newState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        selectedId: 'PRODUCT-AAA',
        initialized: true,
        loaded: false,
      };

      const initialState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = DomainsCardsActions.selectDomainCard({
        id: 'PRODUCT-AAA',
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('unselectDomainCard', () => {
    it('should unselect the DomainCard', () => {
      const newState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: DomainsCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            domainId: 'A',
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: 'A',
            col: 0,
            row: 0,
            availableResources: 0,
            lockedResources: 0,
          },
        },
        selectedId: 'PRODUCT-AAA',
        initialized: true,
        loaded: false,
      };

      const action = DomainsCardsActions.unselectDomainCard();

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('setDomainsCardsError', () => {
    it('should set the error', () => {
      const newState: DomainsCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: DomainsCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = DomainsCardsActions.setDomainsCardsError({
        error: ERROR_MSG,
      });

      const state: DomainsCardsState = domainsCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
