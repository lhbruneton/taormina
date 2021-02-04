import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as DomainCardsActions from './domain-cards.actions';
import * as DomainCardsSelectors from './domain-cards.selectors';

@Injectable()
export class DomainCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DomainCardsSelectors.getDomainCardsLoaded));
  allDomainCards$ = this.store.pipe(
    select(DomainCardsSelectors.getAllDomainCards)
  );
  selectedDomainCards$ = this.store.pipe(
    select(DomainCardsSelectors.getDomainCardsSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(DomainCardsActions.initDomainCardsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(DomainCardsActions.initDomainCardsSavedGame());
  }
}
