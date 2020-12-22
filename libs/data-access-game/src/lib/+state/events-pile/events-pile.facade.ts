import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as EventsPileActions from './events-pile.actions';
import * as EventsPileFeature from './events-pile.reducer';
import * as EventsPileSelectors from './events-pile.selectors';

@Injectable()
export class EventsPileFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(EventsPileSelectors.getEventsPileLoaded));
  allEventsPile$ = this.store.pipe(
    select(EventsPileSelectors.getAllEventsPile)
  );
  selectedEventsPile$ = this.store.pipe(
    select(EventsPileSelectors.getEventsPileSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(EventsPileActions.initEventsPile());
  }
}
