import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';
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
  initNewGame() {
    this.store.dispatch(DiscardPileCardsActions.initDiscardPileCardsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(
      DiscardPileCardsActions.initDiscardPileCardsSavedGame()
    );
  }
}
