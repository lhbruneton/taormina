import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { LandCardsEntity } from '../cards/models/land';

export const LANDS_PILE_CARDS_FEATURE_KEY = 'landsPileCards';

export interface LandsPileCardsState extends EntityState<LandCardsEntity> {
  selectedId?: string | number; // which LandsPileCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the LandsPileCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface LandsPileCardsPartialState {
  readonly [LANDS_PILE_CARDS_FEATURE_KEY]: LandsPileCardsState;
}

export const landsPileCardsAdapter: EntityAdapter<LandCardsEntity> = createEntityAdapter<
  LandCardsEntity
>();

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
