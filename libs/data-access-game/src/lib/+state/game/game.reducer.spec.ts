import { Action } from '@ngrx/store';
import {
  ActionName,
  DomainColor,
  EventValue,
  GamePhase,
} from '@taormina/shared-models';

import * as GameActions from './game.actions';
import { gameReducer, GameState, initialGameState } from './game.reducer';

describe('Game Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = gameReducer(initialGameState, action);

      expect(result).toBe(initialGameState);
    });
  });

  describe('initNewGame', () => {
    it('should set back the initial game state', () => {
      const initialState: GameState = {
        productionDie: 2,
        nextProductionDie: 5,
        eventDie: EventValue.Thieves,
        phase: GamePhase.InitialDraw,
        player: DomainColor.Blue,
        action: ActionName.Goldsmith,
      };

      const action = GameActions.initNewGame();

      const state: GameState = gameReducer(initialState, action);

      expect(state).toEqual(initialGameState);
    });
  });

  describe('setProductionDie', () => {
    it('should set the production die value', () => {
      const newState: GameState = {
        productionDie: 2,
        nextProductionDie: undefined,
        eventDie: undefined,
        phase: GamePhase.InitialThrow,
        player: DomainColor.Red,
        action: undefined,
      };

      const action = GameActions.setProductionDie({ value: 2 });

      const state: GameState = gameReducer(initialGameState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setNextProductionDie', () => {
    it('should set the next production die value', () => {
      const newState: GameState = {
        productionDie: undefined,
        nextProductionDie: 5,
        eventDie: undefined,
        phase: GamePhase.InitialThrow,
        player: DomainColor.Red,
        action: undefined,
      };

      const action = GameActions.setNextProductionDie({ value: 5 });

      const state: GameState = gameReducer(initialGameState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setEventDie', () => {
    it('should set the event die value', () => {
      const newState: GameState = {
        productionDie: undefined,
        nextProductionDie: undefined,
        eventDie: EventValue.Thieves,
        phase: GamePhase.InitialThrow,
        player: DomainColor.Red,
        action: undefined,
      };

      const action = GameActions.setEventDie({ value: EventValue.Thieves });

      const state: GameState = gameReducer(initialGameState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setPhase', () => {
    it('should set the current phase', () => {
      const newState: GameState = {
        productionDie: undefined,
        nextProductionDie: undefined,
        eventDie: undefined,
        phase: GamePhase.InitialDraw,
        player: DomainColor.Red,
        action: undefined,
      };

      const action = GameActions.setPhase({ phase: GamePhase.InitialDraw });

      const state: GameState = gameReducer(initialGameState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setPlayer', () => {
    it('should set the current player', () => {
      const newState: GameState = {
        productionDie: undefined,
        nextProductionDie: undefined,
        eventDie: undefined,
        phase: GamePhase.InitialThrow,
        player: DomainColor.Blue,
        action: undefined,
      };

      const action = GameActions.setPlayer({ player: DomainColor.Blue });

      const state: GameState = gameReducer(initialGameState, action);

      expect(state).toEqual(newState);
    });
  });

  describe('setAction', () => {
    it('should set the current action', () => {
      const newState: GameState = {
        productionDie: undefined,
        nextProductionDie: undefined,
        eventDie: undefined,
        phase: GamePhase.InitialThrow,
        player: DomainColor.Red,
        action: ActionName.Goldsmith,
      };

      const action = GameActions.setAction({ action: ActionName.Goldsmith });

      const state: GameState = gameReducer(initialGameState, action);

      expect(state).toEqual(newState);
    });
  });
});
