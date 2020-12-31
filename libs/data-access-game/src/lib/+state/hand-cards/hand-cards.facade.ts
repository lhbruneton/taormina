import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as HandCardsActions from './hand-cards.actions';
import * as HandCardsFeature from './hand-cards.reducer';
import * as HandCardsSelectors from './hand-cards.selectors';

@Injectable()
export class HandCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(HandCardsSelectors.getHandCardsLoaded));
  allHandCards$ = this.store.pipe(select(HandCardsSelectors.getAllHandCards));
  selectedHandCards$ = this.store.pipe(
    select(HandCardsSelectors.getHandCardsSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(HandCardsActions.initHandCards());
  }
}
