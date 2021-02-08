import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import * as LandsPileCardsFeature from './lands-pile-cards.reducer';
import * as LandsPileCardsSelectors from './lands-pile-cards.selectors';

@Injectable()
export class LandsPileCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(LandsPileCardsSelectors.getLandsPileCardsLoaded)
  );
  allLandsPileCards$ = this.store.pipe(
    select(LandsPileCardsSelectors.getAllLandsPileCards)
  );
  selectedLandsPileCards$ = this.store.pipe(
    select(LandsPileCardsSelectors.getLandsPileCardsSelected)
  );

  constructor(
    private store: Store<LandsPileCardsFeature.LandsPileCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(LandsPileCardsActions.initLandsPileCardsNewGame());
  }

  initSavedGame() {
    this.store.dispatch(LandsPileCardsActions.initLandsPileCardsSavedGame());
  }
}
