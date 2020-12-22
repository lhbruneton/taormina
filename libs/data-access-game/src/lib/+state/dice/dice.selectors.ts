import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DICE_FEATURE_KEY,
  DiceState,
  DicePartialState,
  diceAdapter,
} from './dice.reducer';

// Lookup the 'Dice' feature state managed by NgRx
export const getDiceState = createFeatureSelector<DicePartialState, DiceState>(
  DICE_FEATURE_KEY
);

const { selectAll, selectEntities } = diceAdapter.getSelectors();

export const getDiceLoaded = createSelector(
  getDiceState,
  (state: DiceState) => state.loaded
);

export const getDiceError = createSelector(
  getDiceState,
  (state: DiceState) => state.error
);

export const getAllDice = createSelector(getDiceState, (state: DiceState) =>
  selectAll(state)
);

export const getDiceEntities = createSelector(
  getDiceState,
  (state: DiceState) => selectEntities(state)
);

export const getDiceSelectedId = createSelector(
  getDiceState,
  (state: DiceState) => state.selectedId
);

export const getDiceSelected = createSelector(
  getDiceEntities,
  getDiceSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
