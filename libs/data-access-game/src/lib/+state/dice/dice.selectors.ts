import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DICE_FEATURE_KEY,
  State,
  DicePartialState,
  diceAdapter,
} from './dice.reducer';

// Lookup the 'Dice' feature state managed by NgRx
export const getDiceState = createFeatureSelector<DicePartialState, State>(
  DICE_FEATURE_KEY
);

const { selectAll, selectEntities } = diceAdapter.getSelectors();

export const getDiceLoaded = createSelector(
  getDiceState,
  (state: State) => state.loaded
);

export const getDiceError = createSelector(
  getDiceState,
  (state: State) => state.error
);

export const getAllDice = createSelector(getDiceState, (state: State) =>
  selectAll(state)
);

export const getDiceEntities = createSelector(getDiceState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getDiceState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDiceEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
