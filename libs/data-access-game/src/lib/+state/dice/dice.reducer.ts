import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DiceActions from './dice.actions';
import { DiceEntity } from './dice.models';

export const DICE_FEATURE_KEY = 'dice';

export interface DiceState extends EntityState<DiceEntity> {
  selectedId?: string | number; // which Dice record has been selected
  initialized: boolean;
  loaded: boolean; // has the Dice list been loaded
  error?: string | null; // last known error (if any)
}

export interface DicePartialState {
  readonly [DICE_FEATURE_KEY]: DiceState;
}

export const diceAdapter: EntityAdapter<DiceEntity> = createEntityAdapter<DiceEntity>();

export const initialDiceState: DiceState = diceAdapter.getInitialState({
  // set initial required properties
  initialized: false,
  loaded: false,
});

export const diceReducer = createReducer(
  initialDiceState,
  on(DiceActions.initDiceNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(DiceActions.initDiceSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DiceActions.loadDiceSuccess, (state, { dice }) =>
    diceAdapter.setAll(dice, { ...state, loaded: true })
  ),
  on(DiceActions.loadDiceFailure, (state, { error }) => ({ ...state, error })),
  on(DiceActions.setDiceInitialized, (state, { dice }) =>
    diceAdapter.setAll(dice, { ...state, initialized: true })
  )
);
