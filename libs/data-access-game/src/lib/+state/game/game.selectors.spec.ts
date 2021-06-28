/* eslint-disable no-magic-numbers */
import {
  ActionName,
  DomainColor,
  EventValue,
  GamePhase,
} from '@taormina/shared-models';

import { GamePartialState, initialGameState } from './game.reducer';
import * as GameSelectors from './game.selectors';

describe('Game Selectors', () => {
  let state: GamePartialState;

  beforeEach(() => {
    state = {
      game: {
        ...initialGameState,
        productionDie: 1,
        nextProductionDie: 6,
        eventDie: EventValue.Event,
        action: ActionName.Goldsmith,
      },
    };
  });

  describe('getGameProductionDie()', () => {
    it('should return the production die value', () => {
      const result = GameSelectors.getGameProductionDie(state);

      expect(result).toBe(1);
    });
  });

  describe('getGameNextProductionDie()', () => {
    it('should return the next production die value', () => {
      const result = GameSelectors.getGameNextProductionDie(state);

      expect(result).toBe(6);
    });
  });

  describe('getGameEventDie()', () => {
    it('should return the event die value', () => {
      const result = GameSelectors.getGameEventDie(state);

      expect(result).toBe(EventValue.Event);
    });
  });

  describe('getGamePhase()', () => {
    it('should return the current phase', () => {
      const result = GameSelectors.getGamePhase(state);

      expect(result).toBe(GamePhase.InitialThrow);
    });
  });

  describe('getGamePlayer()', () => {
    it('should return the current player', () => {
      const result = GameSelectors.getGamePlayer(state);

      expect(result).toBe(DomainColor.Red);
    });
  });

  describe('getGameAction()', () => {
    it('should return the current action', () => {
      const result = GameSelectors.getGameAction(state);

      expect(result).toBe(ActionName.Goldsmith);
    });
  });
});
