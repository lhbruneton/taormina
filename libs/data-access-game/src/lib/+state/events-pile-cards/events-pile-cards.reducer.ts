import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventsPileCardsEntity } from './events-pile-cards.models';

export const EVENTS_PILE_CARDS_FEATURE_KEY = 'eventsPileCards';

export interface EventsPileCardsState
  extends EntityState<EventsPileCardsEntity> {
  selectedId?: string;
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
}

export interface EventsPileCardsPartialState {
  readonly [EVENTS_PILE_CARDS_FEATURE_KEY]: EventsPileCardsState;
}

// eslint-disable-next-line max-len
export const eventsPileCardsAdapter: EntityAdapter<EventsPileCardsEntity> = createEntityAdapter<EventsPileCardsEntity>();

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
    errorMsg: undefined,
  })),
  on(
    EventsPileCardsActions.loadEventsPileCardsSuccess,
    (state, { eventsPileCards }) =>
      eventsPileCardsAdapter.setAll(eventsPileCards, { ...state, loaded: true })
  ),
  on(EventsPileCardsActions.loadEventsPileCardsFailure, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(
    EventsPileCardsActions.setEventsPileCardsInitialized,
    (state, { eventsPileCards }) =>
      eventsPileCardsAdapter.setAll(eventsPileCards, {
        ...state,
        initialized: true,
      })
  ),
  on(EventsPileCardsActions.setEventsPileCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(EventsPileCardsActions.selectEventsPileCard, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(EventsPileCardsActions.unselectEventsPileCard, (state) => ({
    ...state,
    selectedId: undefined,
  })),
  on(EventsPileCardsActions.removeEventsPileCard, (state, { id }) =>
    eventsPileCardsAdapter.removeOne(id, state)
  )
);
