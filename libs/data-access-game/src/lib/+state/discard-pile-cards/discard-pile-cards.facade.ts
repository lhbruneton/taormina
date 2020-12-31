import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import * as DiscardPileCardsFeature from './discard-pile-cards.reducer';
import * as DiscardPileCardsSelectors from './discard-pile-cards.selectors';

@Injectable()
export class DiscardPileCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(DiscardPileCardsSelectors.getDiscardPileCardsLoaded)
  );
  allDiscardPileCards$ = this.store.pipe(
    select(DiscardPileCardsSelectors.getAllDiscardPileCards)
  );
  selectedDiscardPileCards$ = this.store.pipe(
    select(DiscardPileCardsSelectors.getDiscardPileCardsSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DiscardPileCardsActions.initDiscardPileCards());
  }
}
