import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CardsActions from './cards.actions';
import { CardsEntity } from './cards.models';

export const CARDS_FEATURE_KEY = 'cards';

export interface CardsState extends EntityState<CardsEntity> {
  selectedId?: string | number; // which Cards record has been selected
  initialized: boolean;
  loaded: boolean; // has the Cards list been loaded
  error?: string | null; // last known error (if any)
}

export interface CardsPartialState {
  readonly [CARDS_FEATURE_KEY]: CardsState;
}

export const cardsAdapter: EntityAdapter<CardsEntity> = createEntityAdapter<CardsEntity>();

export const initialCardsState: CardsState = cardsAdapter.getInitialState({
  // set initial required properties
  initialized: false,
  loaded: false,
});

export const cardsReducer = createReducer(
  initialCardsState,
  on(CardsActions.initCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(CardsActions.initCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CardsActions.loadCardsSuccess, (state, { cards }) =>
    cardsAdapter.setAll(cards, { ...state, loaded: true })
  ),
  on(CardsActions.loadCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CardsActions.setCardsInitialized, (state, { cards }) =>
    cardsAdapter.setAll(cards, { ...state, initialized: true })
  )
);
