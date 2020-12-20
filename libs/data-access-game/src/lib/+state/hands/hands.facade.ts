import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as HandsActions from './hands.actions';
import * as HandsFeature from './hands.reducer';
import * as HandsSelectors from './hands.selectors';

@Injectable()
export class HandsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(HandsSelectors.getHandsLoaded));
  allHands$ = this.store.pipe(select(HandsSelectors.getAllHands));
  selectedHands$ = this.store.pipe(select(HandsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(HandsActions.init());
  }
}
