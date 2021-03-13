import { createStockPilesCardsEntity } from './stock-piles-cards.models';
import * as StockPilesCardsActions from './stock-piles-cards.actions';
import {
  StockPilesCardsState,
  initialStockPilesCardsState,
  stockPilesCardsReducer,
} from './stock-piles-cards.reducer';
import { Action } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

describe('StockPilesCards Reducer', () => {
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
});
