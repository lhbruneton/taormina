import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as DomainsActions from './domains.actions';
import * as DomainsFeature from './domains.reducer';
import * as DomainsSelectors from './domains.selectors';

@Injectable()
export class DomainsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DomainsSelectors.getDomainsLoaded));
  allDomains$ = this.store.pipe(select(DomainsSelectors.getAllDomains));
  selectedDomains$ = this.store.pipe(
    select(DomainsSelectors.getDomainsSelected)
  );

  constructor(private store: Store<DomainsFeature.DomainsPartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(DomainsActions.initDomainsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(DomainsActions.initDomainsSavedGame());
  }
}
