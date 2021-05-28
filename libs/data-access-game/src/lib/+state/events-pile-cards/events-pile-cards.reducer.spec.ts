import { Action } from '@ngrx/store';

import {
  eventsPileCardsNewGameState,
  eventsPileCardsNewGameStateEntities,
  eventsPileCardsNewGameStateIds,
  eventsPileCardsRemovedSelectedState,
  eventsPileCardsSelectedState,
} from '../../../test';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import { createEventsPileCardsEntity } from './events-pile-cards.models';
import {
  eventsPileCardsReducer,
  EventsPileCardsState,
  initialEventsPileCardsState,
} from './events-pile-cards.reducer';

describe('EventsPileCards Reducer', () => {
  const ERROR_MSG = 'No Error Available';

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = eventsPileCardsReducer(
        initialEventsPileCardsState,
        action
      );

      expect(result).toBe(initialEventsPileCardsState);
    });
  });

  describe('loadEventsPileCardsSuccess', () => {
    it('should set the list of known EventsPileCards and loaded', () => {
      const newState: EventsPileCardsState = {
        ids: ['PRODUCT-AAA', 'PRODUCT-zzz'],
        entities: {
          'PRODUCT-AAA': {
            id: 'PRODUCT-AAA',
            cardId: 'A',
          },
          'PRODUCT-zzz': {
            id: 'PRODUCT-zzz',
            cardId: 'z',
          },
        },
        initialized: false,
        loaded: true,
      };

      const eventsPileCards = [
        createEventsPileCardsEntity('PRODUCT-AAA', 'A'),
        createEventsPileCardsEntity('PRODUCT-zzz', 'z'),
      ];
      const action = EventsPileCardsActions.loadEventsPileCardsSuccess({
        eventsPileCards,
      });

      const state: EventsPileCardsState = eventsPileCardsReducer(
        initialEventsPileCardsState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('setEventsPileCardsError', () => {
    it('should set the error', () => {
      const newState: EventsPileCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
        errorMsg: ERROR_MSG,
      };

      const initialState: EventsPileCardsState = {
        ids: [],
        entities: {},
        initialized: false,
        loaded: false,
      };

      const action = EventsPileCardsActions.setEventsPileCardsError({
        error: ERROR_MSG,
      });

      const state: EventsPileCardsState = eventsPileCardsReducer(
        initialState,
        action
      );

      expect(state).toEqual(newState);
    });
  });

  describe('setEntitiesInitializedEventsPileCards', () => {
    it('should set the list of known EventsPileCards and intialized', () => {
      const action = EventsPileCardsActions.setEntitiesInitializedEventsPileCards(
        {
          eventsPileCards: Object.values(eventsPileCardsNewGameStateEntities),
        }
      );

      const state: EventsPileCardsState = eventsPileCardsReducer(
        initialEventsPileCardsState,
        action
      );

      expect(state).toEqual({
        ...eventsPileCardsNewGameState,
      });
    });
  });

  describe('setEntitiesSelectFirstEventsPileCards', () => {
    it(`should set the list of known EventsPileCards
        and select the first card of the pile`, () => {
      const action = EventsPileCardsActions.setEntitiesSelectFirstEventsPileCards(
        {
          eventsPileCards: Object.values(eventsPileCardsNewGameStateEntities),
        }
      );

      const state: EventsPileCardsState = eventsPileCardsReducer(
        { ...initialEventsPileCardsState, initialized: true },
        action
      );

      expect(state).toEqual({
        ...eventsPileCardsNewGameState,
        selectedId: eventsPileCardsNewGameStateIds[0],
      });
    });
  });

  describe('selectFirstEventsPileCard', () => {
    it('should set the selectedId to the first card of the pile', () => {
      const action = EventsPileCardsActions.selectFirstEventsPileCard();

      const state: EventsPileCardsState = eventsPileCardsReducer(
        eventsPileCardsNewGameState,
        action
      );

      expect(state).toEqual({
        ...eventsPileCardsNewGameState,
        selectedId: eventsPileCardsNewGameStateIds[0],
      });
    });
  });

  describe('removeSelectedEventsPileCard', () => {
    it(`should remove the selected card from the pile
        and set selectedId to undefined`, () => {
      const action = EventsPileCardsActions.removeSelectedEventsPileCard();

      const state: EventsPileCardsState = eventsPileCardsReducer(
        eventsPileCardsSelectedState(),
        action
      );

      expect(state).toEqual(eventsPileCardsRemovedSelectedState());
    });
  });
});
