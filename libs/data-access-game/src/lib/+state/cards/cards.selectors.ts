import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CARDS_FEATURE_KEY,
  CardsState,
  CardsPartialState,
  cardsAdapter,
} from './cards.reducer';

// Lookup the 'Cards' feature state managed by NgRx
export const getCardsState = createFeatureSelector<
  CardsPartialState,
  CardsState
>(CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = cardsAdapter.getSelectors();

export const getCardsLoaded = createSelector(
  getCardsState,
  (state: CardsState) => state.loaded
);

export const getCardsError = createSelector(
  getCardsState,
  (state: CardsState) => state.error
);

export const getAllCards = createSelector(getCardsState, (state: CardsState) =>
  selectAll(state)
);

export const getCardsEntities = createSelector(
  getCardsState,
  (state: CardsState) => selectEntities(state)
);

export const getCardsSelectedId = createSelector(
  getCardsState,
  (state: CardsState) => state.selectedId
);

export const getCardsSelected = createSelector(
  getCardsEntities,
  getCardsSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
