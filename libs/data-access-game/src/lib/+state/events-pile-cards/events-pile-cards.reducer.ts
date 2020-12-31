import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventsPileCardsEntity } from './events-pile-cards.models';

export const EVENTS_PILE_CARDS_FEATURE_KEY = 'eventsPileCards';

export interface EventsPileCardsState
  extends EntityState<EventsPileCardsEntity> {
  selectedId?: string | number; // which EventsPileCards record has been selected
  loaded: boolean; // has the EventsPileCards list been loaded
  error?: string | null; // last known error (if any)
}

export interface EventsPileCardsPartialState {
  readonly [EVENTS_PILE_CARDS_FEATURE_KEY]: EventsPileCardsState;
}

export const eventsPileCardsAdapter: EntityAdapter<EventsPileCardsEntity> = createEntityAdapter<EventsPileCardsEntity>();

export const initialEventsPileCardsState: EventsPileCardsState = eventsPileCardsAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const eventsPileCardsReducer = createReducer(
  initialEventsPileCardsState,
  on(EventsPileCardsActions.initEventsPileCards, (state) => ({
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
  }))
);
