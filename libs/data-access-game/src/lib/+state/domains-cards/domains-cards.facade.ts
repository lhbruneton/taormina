import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as DomainsCardsActions from './domains-cards.actions';
import * as DomainsCardsFeature from './domains-cards.reducer';
import * as DomainsCardsSelectors from './domains-cards.selectors';

@Injectable()
export class DomainsCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(DomainsCardsSelectors.getDomainsCardsLoaded)
  );
  allDomainsCards$ = this.store.pipe(
    select(DomainsCardsSelectors.getAllDomainsCards)
  );
  selectedDomainsCards$ = this.store.pipe(
    select(DomainsCardsSelectors.getDomainsCardsSelected)
  );

  constructor(
    private store: Store<DomainsCardsFeature.DomainsCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(DomainsCardsActions.initDomainsCardsNewGame());
  }

  initSavedGame(): void {
    this.store.dispatch(DomainsCardsActions.initDomainsCardsSavedGame());
  }
}
