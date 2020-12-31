import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import * as EventsPileCardsFeature from './events-pile-cards.reducer';
import * as EventsPileCardsSelectors from './events-pile-cards.selectors';

@Injectable()
export class EventsPileCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(EventsPileCardsSelectors.getEventsPileCardsLoaded)
  );
  allEventsPileCards$ = this.store.pipe(
    select(EventsPileCardsSelectors.getAllEventsPileCards)
  );
  selectedEventsPileCards$ = this.store.pipe(
    select(EventsPileCardsSelectors.getEventsPileCardsSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(EventsPileCardsActions.initEventsPileCards());
  }
}