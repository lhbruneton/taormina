import { Action } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

import {
  someStockPilesCardsId,
  stockPilesCardsFirstPileFirstCardDrawnState,
  stockPilesCardsFirstPileLastCardPutBackState,
  stockPilesCardsNewGameStateEntities,
} from '../../../test';
import * as StockPilesCardsActions from './stock-piles-cards.actions';
import { createStockPilesCardsEntity } from './stock-piles-cards.models';
import {
  initialStockPilesCardsState,
  stockPilesCardsReducer,
  StockPilesCardsState,
} from './stock-piles-cards.reducer';

describe('StockPilesCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = stockPilesCardsReducer(
        initialStockPilesCardsState,
        action
      );

      expect(result).toBe(initialStockPilesCardsState);
    });
  });

  describe('loadStockPilesCardsSuccess', () => {
    it('should set the list of known StockPilesCards and loaded', () => {
      const newState: StockPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            pileId: 'z',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const stockPilesCards = [
        createStockPilesCardsEntity(
          'PRODUCT-AAA',
          'A',
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'A'
        ),
        createStockPilesCardsEntity(
          'PRODUCT-zzz',
          'z',
          ACTION_CARD_INTERFACE_NAME,
          'z'
        ),
      ];
      const action = StockPilesCardsActions.loadStockPilesCardsSuccess({
        stockPilesCards,
      });

      const state: StockPilesCardsState = stockPilesCardsReducer(
        initialStockPilesCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('removeStockPilesCards', () => {
    it('should remove StockPilesCards from the list', () => {
      const newState: StockPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            pileId: 'z',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'z',
          },
        },
        initialized: true,
        loaded: false,
      };

      const initialState: StockPilesCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-BBB', 'PRODUCT-CCC', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            pileId: 'A',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
          'PRODUCT-BBB': {
            id: 'PRODUCT-BBB',
            pileId: 'B',
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: 'B',
          },
          'PRODUCT-CCC': {
            id: 'PRODUCT-CCC',
            pileId: 'C',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'C',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            pileId: 'z',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'z',
          },
        },
        initialized: true,
        loaded: false,
      };

      const action = StockPilesCardsActions.removeStockPilesCards({
        ids: ['PRODUCT-BBB', 'PRODUCT-CCC'],
      });

      const state: StockPilesCardsState = stockPilesCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('addStockPilesCards', () => {
    it('should add StockPilesCards to the list', () => {
      const action = StockPilesCardsActions.addStockPilesCards({
        stockPilesCards: [
          stockPilesCardsNewGameStateEntities[someStockPilesCardsId],
        ],
      });

      const state: StockPilesCardsState = stockPilesCardsReducer(
        stockPilesCardsFirstPileFirstCardDrawnState(),
        action
      );

      expect(state).toEqual(stockPilesCardsFirstPileLastCardPutBackState());
    });
  });

  describe('setStockPilesCardsError', () => {
    it('should set the error', () => {
      const newState: StockPilesCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: StockPilesCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = StockPilesCardsActions.setStockPilesCardsError({
        error: ERROR_MSG,
      });

      const state: StockPilesCardsState = stockPilesCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });
});
