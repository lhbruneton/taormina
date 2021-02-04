import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as HandCardsActions from './hand-cards.actions';
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
  initNewGame() {
    this.store.dispatch(HandCardsActions.initHandCardsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(HandCardsActions.initHandCardsSavedGame());
  }
}
