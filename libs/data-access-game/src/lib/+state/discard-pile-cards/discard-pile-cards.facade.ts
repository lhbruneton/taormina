import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

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
  allDiscardPileCardsReverse$ = this.store.pipe(
    select(DiscardPileCardsSelectors.getAllDiscardPileCardsReverse)
  );
  selectedDiscardPileCards$ = this.store.pipe(
    select(DiscardPileCardsSelectors.getDiscardPileCardsSelected)
  );

  constructor(
    private store: Store<DiscardPileCardsFeature.DiscardPileCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(DiscardPileCardsActions.initDiscardPileCardsNewGame());
  }

  initSavedGame(): void {
    this.store.dispatch(
      DiscardPileCardsActions.initDiscardPileCardsSavedGame()
    );
  }

  addCardToDiscardPile(card: {
    type:
      | typeof ACTION_CARD_INTERFACE_NAME
      | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
    id: string;
  }): void {
    this.store.dispatch(DiscardPileCardsActions.addCardToDiscardPile({ card }));
  }
}
