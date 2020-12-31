import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { CardsEntity } from '../../model/cards.models';

export const LANDS_PILE_CARDS_FEATURE_KEY = 'landsPileCards';

export interface LandsPileCardsState extends EntityState<CardsEntity> {
  selectedId?: string | number; // which LandsPileCards record has been selected
  loaded: boolean; // has the LandsPileCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface LandsPileCardsPartialState {
  readonly [LANDS_PILE_CARDS_FEATURE_KEY]: LandsPileCardsState;
}

export const landsPileCardsAdapter: EntityAdapter<CardsEntity> = createEntityAdapter<CardsEntity>();

export const initialLandsPileCardsState: LandsPileCardsState = landsPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const landsPileCardsReducer = createReducer(
  initialLandsPileCardsState,
  on(LandsPileCardsActions.initLandsPileCards, (state) => ({
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
  }))
);
