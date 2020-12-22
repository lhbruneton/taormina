import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EventsPileActions from './events-pile.actions';
import { EventsPileEntity } from './events-pile.models';

export const EVENTS_PILE_FEATURE_KEY = 'eventsPile';

export interface EventsPileState extends EntityState<EventsPileEntity> {
  selectedId?: string | number; // which EventsPile record has been selected
  loaded: boolean; // has the EventsPile list been loaded
  error?: string | null; // last known error (if any)
}

export interface EventsPilePartialState {
  readonly [EVENTS_PILE_FEATURE_KEY]: EventsPileState;
}

export const eventsPileAdapter: EntityAdapter<EventsPileEntity> = createEntityAdapter<
  EventsPileEntity
>();

export const initialEventsPileState: EventsPileState = eventsPileAdapter.getInitialState(
  {
    // set initial required properties
    loaded: false,
  }
);

export const eventsPileReducer = createReducer(
  initialEventsPileState,
  on(EventsPileActions.initEventsPile, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(EventsPileActions.loadEventsPileSuccess, (state, { eventsPile }) =>
    eventsPileAdapter.setAll(eventsPile, { ...state, loaded: true })
  ),
  on(EventsPileActions.loadEventsPileFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
