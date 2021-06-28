import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamePartialState, GameState, GAME_FEATURE_KEY } from './game.reducer';

// Lookup the 'Game' feature state managed by NgRx
export const getGameState =
  createFeatureSelector<GamePartialState, GameState>(GAME_FEATURE_KEY);

export const getGameProductionDie = createSelector(
  getGameState,
  (state: GameState) => state.productionDie
);

export const getGameNextProductionDie = createSelector(
  getGameState,
  (state: GameState) => state.nextProductionDie
);

export const getGameEventDie = createSelector(
  getGameState,
  (state: GameState) => state.eventDie
);

export const getGamePhase = createSelector(
  getGameState,
  (state: GameState) => state.phase
);

export const getGamePlayer = createSelector(
  getGameState,
  (state: GameState) => state.player
);

export const getGameAction = createSelector(
  getGameState,
  (state: GameState) => state.action
);
