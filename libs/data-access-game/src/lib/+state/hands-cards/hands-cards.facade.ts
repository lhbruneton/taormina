import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

import * as HandsCardsActions from './hands-cards.actions';
import * as HandsCardsFeature from './hands-cards.reducer';
import * as HandsCardsSelectors from './hands-cards.selectors';

@Injectable()
export class HandsCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(HandsCardsSelectors.getHandsCardsLoaded));
  allHandsCards$ = this.store.pipe(
    select(HandsCardsSelectors.getAllHandsCards)
  );
  selectedHandsCards$ = this.store.pipe(
    select(HandsCardsSelectors.getHandsCardsSelected)
  );

  constructor(private store: Store<HandsCardsFeature.HandsCardsPartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(HandsCardsActions.initHandsCardsNewGame());
  }

  initSavedGame(): void {
    this.store.dispatch(HandsCardsActions.initHandsCardsSavedGame());
  }

  addCardsToHand(
    handId: string,
    cards: Array<{
      type:
        | typeof ACTION_CARD_INTERFACE_NAME
        | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
      id: string;
    }>
  ): void {
    this.store.dispatch(HandsCardsActions.addCardsToHand({ handId, cards }));
  }
}
