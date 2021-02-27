import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import * as FaceUpPilesCardsFeature from './face-up-piles-cards.reducer';
import * as FaceUpPilesCardsSelectors from './face-up-piles-cards.selectors';

@Injectable()
export class FaceUpPilesCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(FaceUpPilesCardsSelectors.getFaceUpPilesCardsLoaded)
  );
  allFaceUpPilesCards$ = this.store.pipe(
    select(FaceUpPilesCardsSelectors.getAllFaceUpPilesCards)
  );
  selectedFaceUpPilesCards$ = this.store.pipe(
    select(FaceUpPilesCardsSelectors.getFaceUpSelected)
  );

  constructor(
    private store: Store<FaceUpPilesCardsFeature.FaceUpPilesCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(FaceUpPilesCardsActions.initFaceUpNewGame());
  }

  initSavedGame(): void {
    this.store.dispatch(FaceUpPilesCardsActions.initFaceUpSavedGame());
  }
}
