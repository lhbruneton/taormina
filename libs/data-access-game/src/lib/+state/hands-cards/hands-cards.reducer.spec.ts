import { createHandsCardsEntity } from './hands-cards.models';
import * as HandsCardsActions from './hands-cards.actions';
import {
  HandsCardsState,
  initialHandsCardsState,
  handsCardsReducer,
} from './hands-cards.reducer';
import { Action } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

describe('HandsCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = handsCardsReducer(initialHandsCardsState, action);

      expect(result).toBe(initialHandsCardsState);
    });
  });

  describe('loadHandsCardsSuccess', () => {
    it('should set the list of known HandsCards and loaded', () => {
      const newState: HandsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            handId: 'A',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            handId: 'z',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const handsCards = [
        createHandsCardsEntity(
          'PRODUCT-AAA',
          'A',
          ACTION_CARD_INTERFACE_NAME,
          'A'
        ),
        createHandsCardsEntity(
          'PRODUCT-zzz',
          'z',
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'z'
        ),
      ];
      const action = HandsCardsActions.loadHandsCardsSuccess({ handsCards });

      const state: HandsCardsState = handsCardsReducer(
        initialHandsCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('addHandsCards', () => {
    it('should add HandsCards to the list', () => {
      const newState: HandsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz', 'PRODUCT-BBB', 'PRODUCT-CCC'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            handId: 'A',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            handId: 'z',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'z',
          },
          'PRODUCT-BBB': {
            id: 'PRODUCT-BBB',
            handId: 'B',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'B',
          },
          'PRODUCT-CCC': {
            id: 'PRODUCT-CCC',
            handId: 'C',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'C',
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: HandsCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            handId: 'A',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            handId: 'z',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'z',
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = HandsCardsActions.addHandsCards({
        handsCards: [
          {
            id: 'PRODUCT-BBB',
            handId: 'B',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'B',
          },
          {
            id: 'PRODUCT-CCC',
            handId: 'C',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'C',
          },
        ],
      });

      const state: HandsCardsState = handsCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setHandsCardsError', () => {
    it('should set the error', () => {
      const newState: HandsCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: HandsCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = HandsCardsActions.setHandsCardsError({
        error: ERROR_MSG,
      });

      const state: HandsCardsState = handsCardsReducer(initialState, action);

      expect(state).toEqual(newState);
    });
  });
});
