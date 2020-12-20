import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

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
  selectedDomains$ = this.store.pipe(select(DomainsSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DomainsActions.init());
  }
}
