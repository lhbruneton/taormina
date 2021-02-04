import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FaceUpPilesActions from './face-up-piles.actions';
import * as FaceUpPilesSelectors from './face-up-piles.selectors';

@Injectable()
export class FaceUpPilesFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(FaceUpPilesSelectors.getFaceUpPilesLoaded));
  allFaceUpPiles$ = this.store.pipe(
    select(FaceUpPilesSelectors.getAllFaceUpPiles)
  );
  selectedFaceUpPiles$ = this.store.pipe(
    select(FaceUpPilesSelectors.getFaceUpSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(FaceUpPilesActions.initFaceUpNewGame());
  }

  initSavedGame() {
    this.store.dispatch(FaceUpPilesActions.initFaceUpSavedGame());
  }
}
