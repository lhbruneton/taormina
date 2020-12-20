import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as EventsPileActions from './events-pile.actions';
import { EventsPileEntity } from './events-pile.models';

export const EVENTS_PILE_FEATURE_KEY = 'eventsPile';

export interface State extends EntityState<EventsPileEntity> {
  selectedId?: string | number; // which EventsPile record has been selected
  loaded: boolean; // has the EventsPile list been loaded
  error?: string | null; // last known error (if any)
}

export interface EventsPilePartialState {
  readonly [EVENTS_PILE_FEATURE_KEY]: State;
}

export const eventsPileAdapter: EntityAdapter<EventsPileEntity> = createEntityAdapter<
  EventsPileEntity
>();

export const initialState: State = eventsPileAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const eventsPileReducer = createReducer(
  initialState,
  on(EventsPileActions.init, (state) => ({
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

export function reducer(state: State | undefined, action: Action) {
  return eventsPileReducer(state, action);
}
