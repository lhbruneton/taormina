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
    selectedId: undefined,
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
  on(EventsPileCardsActions.setEventsPileCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(
    EventsPileCardsActions.setEntitiesInitializedEventsPileCards,
    (state, { eventsPileCards }) =>
      eventsPileCardsAdapter.setAll(eventsPileCards, {
        ...state,
        initialized: true,
      })
  ),
  on(
    EventsPileCardsActions.setEntitiesSelectFirstEventsPileCards,
    (state, { eventsPileCards }) =>
      eventsPileCardsAdapter.setAll(eventsPileCards, {
        ...state,
        selectedId: eventsPileCards[0].id,
      })
  ),
  on(EventsPileCardsActions.selectFirstEventsPileCard, (state) => ({
    ...state,
    selectedId: state.ids[0] as string,
  })),
  on(EventsPileCardsActions.removeSelectedEventsPileCard, (state) => {
    const unselectedState = {
      ...state,
      selectedId: undefined,
    };
    if (state.selectedId !== undefined) {
      return eventsPileCardsAdapter.removeOne(
        state.selectedId,
        unselectedState
      );
    } else {
      return unselectedState;
    }
  })
);
