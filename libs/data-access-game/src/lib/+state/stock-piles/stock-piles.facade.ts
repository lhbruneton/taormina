import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as StockPilesActions from './stock-piles.actions';
import * as StockPilesFeature from './stock-piles.reducer';
import * as StockPilesSelectors from './stock-piles.selectors';

@Injectable()
export class StockPilesFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(StockPilesSelectors.getStockPilesLoaded));
  allStockPiles$ = this.store.pipe(
    select(StockPilesSelectors.getAllStockPiles)
  );
  selectedStockPiles$ = this.store.pipe(
    select(StockPilesSelectors.getStockPilesSelected)
  );

  constructor(private store: Store<StockPilesFeature.StockPilesPartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(StockPilesActions.initStockPilesNewGame());
  }

  initSavedGame() {
    this.store.dispatch(StockPilesActions.initStockPilesSavedGame());
  }
}
