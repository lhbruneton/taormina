import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as CardsActions from './cards.actions';
import * as CardsFeature from './cards.reducer';
import * as CardsSelectors from './cards.selectors';

@Injectable()
export class CardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CardsSelectors.getCardsLoaded));
  allCards$ = this.store.pipe(select(CardsSelectors.getAllCards));
  selectedCards$ = this.store.pipe(select(CardsSelectors.getCardsSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(CardsActions.initCardsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(CardsActions.initCardsSavedGame());
  }

  getCardById(cardId: string) {
    return this.store.pipe(
      select(CardsSelectors.getCardEntityById, { cardId })
    );
  }
}
