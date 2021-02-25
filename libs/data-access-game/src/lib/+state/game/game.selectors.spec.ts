import { DomainColor, EventValue, GamePhase } from '@taormina/shared-models';

import { GamePartialState, initialGameState } from './game.reducer';
import * as GameSelectors from './game.selectors';

describe('Game Selectors', () => {
  let state: GamePartialState;

  beforeEach(() => {
    state = {
      game: {
        ...initialGameState,
        productionDie: 1,
        eventDie: EventValue.Event,
      },
    };
  });

  describe('Game Selectors', () => {
    it('getGameProductionDie() should return the production die value', () => {
      const result = GameSelectors.getGameProductionDie(state);

      expect(result).toBe(1);
    });

    it('getGameEventDie() should return the event die value', () => {
      const result = GameSelectors.getGameEventDie(state);

      expect(result).toBe(EventValue.Event);
    });

    it('getGamePhase() should return the current phase', () => {
      const result = GameSelectors.getGamePhase(state);

      expect(result).toBe(GamePhase.InitialThrow);
    });

    it('getGamePlayer() should return the current player', () => {
      const result = GameSelectors.getGamePlayer(state);

      expect(result).toBe(DomainColor.Red);
    });
  });
});
