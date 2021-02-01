import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CanPrint, isCanPrint } from '@taormina/shared-models';
import { filter, map } from 'rxjs/operators';

import * as CardsActions from './cards.actions';
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

  getPrintableCardById(cardId: string) {
    return this.getCardById(cardId).pipe(
      filter((card) => isCanPrint(card)),
      map((card) => (card as unknown) as CanPrint)
    );
  }

  drawFromStockToHand(stockPileId: string, cardsCount: number, handId: string) {
    this.store.dispatch(
      CardsActions.drawCardsFromStockToHand({ stockPileId, cardsCount, handId })
    );
  }
}
