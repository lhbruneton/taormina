import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DiscardPileActions from './discard-pile.actions';
import * as DiscardPileFeature from './discard-pile.reducer';
import * as DiscardPileSelectors from './discard-pile.selectors';

@Injectable()
export class DiscardPileFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DiscardPileSelectors.getDiscardPileLoaded));
  allDiscardPile$ = this.store.pipe(
    select(DiscardPileSelectors.getAllDiscardPile)
  );
  selectedDiscardPile$ = this.store.pipe(
    select(DiscardPileSelectors.getSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DiscardPileActions.init());
  }
}
