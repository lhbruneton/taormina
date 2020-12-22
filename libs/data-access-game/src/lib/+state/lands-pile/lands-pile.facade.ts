import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as LandsPileActions from './lands-pile.actions';
import * as LandsPileFeature from './lands-pile.reducer';
import * as LandsPileSelectors from './lands-pile.selectors';

@Injectable()
export class LandsPileFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(LandsPileSelectors.getLandsPileLoaded));
  allLandsPile$ = this.store.pipe(select(LandsPileSelectors.getAllLandsPile));
  selectedLandsPile$ = this.store.pipe(
    select(LandsPileSelectors.getLandsPileSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(LandsPileActions.initLandsPile());
  }
}
