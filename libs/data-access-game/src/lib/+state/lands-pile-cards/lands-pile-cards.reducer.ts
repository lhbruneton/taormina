import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { LandsPileCardsEntity } from './lands-pile-cards.models';

export const LANDS_PILE_CARDS_FEATURE_KEY = 'landsPileCards';

export interface LandsPileCardsState extends EntityState<LandsPileCardsEntity> {
  selectedId?: string; // which LandsPileCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the LandsPileCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface LandsPileCardsPartialState {
  readonly [LANDS_PILE_CARDS_FEATURE_KEY]: LandsPileCardsState;
}

export const landsPileCardsAdapter: EntityAdapter<LandsPileCardsEntity> = createEntityAdapter<LandsPileCardsEntity>();

export const initialLandsPileCardsState: LandsPileCardsState = landsPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const landsPileCardsReducer = createReducer(
  initialLandsPileCardsState,
  on(LandsPileCardsActions.initLandsPileCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(LandsPileCardsActions.initLandsPileCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    LandsPileCardsActions.loadLandsPileCardsSuccess,
    (state, { landsPileCards }) =>
      landsPileCardsAdapter.setAll(landsPileCards, { ...state, loaded: true })
  ),
  on(LandsPileCardsActions.loadLandsPileCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    LandsPileCardsActions.setLandsPileCardsInitialized,
    (state, { landsPileCards }) =>
      landsPileCardsAdapter.setAll(landsPileCards, {
        ...state,
        initialized: true,
      })
  )
);
