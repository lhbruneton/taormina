import { Action } from '@ngrx/store';

import * as AgglomerationPilesCardsActions from './agglomeration-piles-cards.actions';
import { createAgglomerationPilesCardsEntity } from './agglomeration-piles-cards.models';
import {
  agglomerationPilesCardsReducer,
  AgglomerationPilesCardsState,
  initialAgglomerationPilesCardsState,
} from './agglomeration-piles-cards.reducer';

describe('AgglomerationPilesCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = agglomerationPilesCardsReducer(
        initialAgglomerationPilesCardsState,
        action
      );

      expect(result).toBe(initialAgglomerationPilesCardsState);
    });
  });

  describe('loadAgglomerationPilesCardsSuccess', () => {
    it('should set the list of known AgglomerationPilesCards and loaded', () => {
      const newState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            pileId: 'z',
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const agglomerationPilesCards = [
        createAgglomerationPilesCardsEntity('PRODUCT-AAA', 'A', 'A'),
        createAgglomerationPilesCardsEntity('PRODUCT-zzz', 'z', 'z'),
      ];
      const action =
        AgglomerationPilesCardsActions.loadAgglomerationPilesCardsSuccess({
          agglomerationPilesCards,
        });

      const state: AgglomerationPilesCardsState =
        agglomerationPilesCardsReducer(
          initialAgglomerationPilesCardsState,
          action
        );

      expect(state).toEqual(newState);
    });
  });

  describe('selectAgglomerationPileCard', () => {
    it('should select the AgglomerationPileCard', () => {
      const newState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        selectedId: 'PRODUCT-AAA',
        initialized: true,
        loaded: false,
      };

      const initialState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = AgglomerationPilesCardsActions.selectAgglomerationPileCard(
        {
          id: 'PRODUCT-AAA',
        }
      );

      const state: AgglomerationPilesCardsState =
        agglomerationPilesCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('unselectAgglomerationPileCard', () => {
    it('should unselect the AgglomerationPileCard', () => {
      const newState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        selectedId: 'PRODUCT-AAA',
        initialized: true,
        loaded: false,
      };

      const action =
        AgglomerationPilesCardsActions.unselectAgglomerationPileCard();

      const state: AgglomerationPilesCardsState =
        agglomerationPilesCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('removeAgglomerationPileCard', () => {
    it('should remove the AgglomerationPileCard from the list', () => {
      const newState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: AgglomerationPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-BBB'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardId: 'A',
          },
          'PRODUCT-BBB': {
            id: 'PRODUCT-BBB',
            pileId: 'B',
            cardId: 'B',
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = AgglomerationPilesCardsActions.removeAgglomerationPileCard(
        {
          id: 'PRODUCT-BBB',
        }
      );

      const state: AgglomerationPilesCardsState =
        agglomerationPilesCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setAgglomerationPilesCardsError', () => {
    it('should set the error', () => {
      const newState: AgglomerationPilesCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: AgglomerationPilesCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action =
        AgglomerationPilesCardsActions.setAgglomerationPilesCardsError({
          error: ERROR_MSG,
        });

      const state: AgglomerationPilesCardsState =
        agglomerationPilesCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
});
