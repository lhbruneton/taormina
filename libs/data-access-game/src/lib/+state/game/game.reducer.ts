import { createReducer, on } from '@ngrx/store';
import {
  DomainColor,
  EventValue,
  GamePhase,
  ResourceValue,
} from '@taormina/shared-models';

import * as GameActions from './game.actions';

export const GAME_FEATURE_KEY = 'game';

export interface GameState {
  productionDie: ResourceValue | undefined;
  nextProductionDie: ResourceValue | undefined;
  eventDie: EventValue | undefined;
  phase: GamePhase;
  player: DomainColor;
}

export interface GamePartialState {
  readonly [GAME_FEATURE_KEY]: GameState;
}

export const initialGameState: GameState = {
  productionDie: undefined,
  nextProductionDie: undefined,
  eventDie: undefined,
  phase: GamePhase.InitialThrow,
  player: DomainColor.Red,
};

export const gameReducer = createReducer(
  initialGameState,
  on(GameActions.initNewGame, () => ({ ...initialGameState })),
  on(GameActions.setProductionDie, (state, { value }) => ({
    ...state,
    productionDie: value,
  })),
  on(GameActions.setNextProductionDie, (state, { value }) => ({
    ...state,
    nextProductionDie: value,
  })),
  on(GameActions.setEventDie, (state, { value }) => ({
    ...state,
    eventDie: value,
  })),
  on(GameActions.setPhase, (state, { phase }) => ({
    ...state,
    phase,
  })),
  on(GameActions.setPlayer, (state, { player }) => ({
    ...state,
    player,
  }))
);
