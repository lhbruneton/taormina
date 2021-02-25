import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DomainColor, GamePhase } from '@taormina/shared-models';

import * as GameActions from './game.actions';
import { GamePartialState } from './game.reducer';
import * as GameSelectors from './game.selectors';

@Injectable()
export class GameFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  productionDie$ = this.store.pipe(select(GameSelectors.getGameProductionDie));
  eventDie$ = this.store.pipe(select(GameSelectors.getGameEventDie));
  phase$ = this.store.pipe(select(GameSelectors.getGamePhase));
  player$ = this.store.pipe(select(GameSelectors.getGamePlayer));

  constructor(private store: Store<GamePartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame() {
    this.store.dispatch(GameActions.initNewGame());
  }

  throwDice() {
    this.store.dispatch(GameActions.throwDice());
  }

  throwProductionDie() {
    this.store.dispatch(GameActions.throwProductionDie());
  }

  throwEventDie() {
    this.store.dispatch(GameActions.throwEventDie());
  }

  setPhase(phase: GamePhase) {
    this.store.dispatch(GameActions.setPhase({ phase }));
  }

  setPlayer(player: DomainColor) {
    this.store.dispatch(GameActions.setPlayer({ player }));
  }
}
