import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as StockPileCardsActions from './stock-pile-cards.actions';
import * as StockPileCardsFeature from './stock-pile-cards.reducer';
import * as StockPileCardsSelectors from './stock-pile-cards.selectors';

@Injectable()
export class StockPileCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(StockPileCardsSelectors.getStockPileCardsLoaded)
  );
  allStockPileCards$ = this.store.pipe(
    select(StockPileCardsSelectors.getAllStockPileCards)
  );
  selectedStockPileCards$ = this.store.pipe(
    select(StockPileCardsSelectors.getStockPileCardsSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(StockPileCardsActions.initStockPileCards());
  }
}