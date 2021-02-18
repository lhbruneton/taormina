import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import * as StockPilesCardsFeature from './stock-piles-cards.reducer';
import * as StockPilesCardsSelectors from './stock-piles-cards.selectors';

@Injectable()
export class StockPilesCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(StockPilesCardsSelectors.getStockPilesCardsLoaded)
  );
  allStockPilesCards$ = this.store.pipe(
    select(StockPilesCardsSelectors.getAllStockPilesCards)
  );
  selectedStockPilesCards$ = this.store.pipe(
    select(StockPilesCardsSelectors.getStockPilesCardsSelected)
  );

  constructor(
    private store: Store<StockPilesCardsFeature.StockPilesCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(StockPilesCardsActions.initStockPilesCardsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(StockPilesCardsActions.initStockPilesCardsSavedGame());
  }

  removeCardsFromStockPile(
    stockPileId: string,
    cards: Array<{
      type:
        | typeof ACTION_CARD_INTERFACE_NAME
        | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
      id: string;
    }>
  ) {
    this.store.dispatch(
      StockPilesCardsActions.removeCardsFromStockPile({ stockPileId, cards })
    );
  }
}
