import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as DiceActions from './dice.actions';
import * as DiceFeature from './dice.reducer';
import * as DiceSelectors from './dice.selectors';

@Injectable()
export class DiceFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(DiceSelectors.getDiceLoaded));
  allDice$ = this.store.pipe(select(DiceSelectors.getAllDice));
  selectedDice$ = this.store.pipe(select(DiceSelectors.getSelected));

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(DiceActions.init());
  }
}
