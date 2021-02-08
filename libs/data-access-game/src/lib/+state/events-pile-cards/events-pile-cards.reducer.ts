import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventCardsEntity } from '../cards/models/event';

export const EVENTS_PILE_CARDS_FEATURE_KEY = 'eventsPileCards';

export interface EventsPileCardsState extends EntityState<EventCardsEntity> {
  selectedId?: string; // which EventsPileCards record has been selected
  initialized: boolean;
  loaded: boolean; // has the EventsPileCards list been loaded
  error?: unknown | null; // last known error (if any)
}

export interface EventsPileCardsPartialState {
  readonly [EVENTS_PILE_CARDS_FEATURE_KEY]: EventsPileCardsState;
}

export const eventsPileCardsAdapter: EntityAdapter<EventCardsEntity> = createEntityAdapter<EventCardsEntity>();

export const initialEventsPileCardsState: EventsPileCardsState = eventsPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    initialized: false,
    loaded: false,
  }
);

export const eventsPileCardsReducer = createReducer(
  initialEventsPileCardsState,
  on(EventsPileCardsActions.initEventsPileCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(EventsPileCardsActions.initEventsPileCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    EventsPileCardsActions.loadEventsPileCardsSuccess,
    (state, { eventsPileCards }) =>
      eventsPileCardsAdapter.setAll(eventsPileCards, { ...state, loaded: true })
  ),
  on(EventsPileCardsActions.loadEventsPileCardsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    EventsPileCardsActions.setEventsPileCardsInitialized,
    (state, { eventsPileCards }) =>
      eventsPileCardsAdapter.setAll(eventsPileCards, {
        ...state,
        initialized: true,
      })
  )
);
