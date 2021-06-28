import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  ActionName,
  DomainColor,
  GamePhase,
  ResourceValue,
} from '@taormina/shared-models';

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
  nextProductionDie$ = this.store.pipe(
    select(GameSelectors.getGameNextProductionDie)
  );
  eventDie$ = this.store.pipe(select(GameSelectors.getGameEventDie));
  phase$ = this.store.pipe(select(GameSelectors.getGamePhase));
  player$ = this.store.pipe(select(GameSelectors.getGamePlayer));
  action$ = this.store.pipe(select(GameSelectors.getGameAction));

  constructor(private store: Store<GamePartialState>) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(GameActions.initNewGame());
  }

  throwDice(): void {
    this.store.dispatch(GameActions.throwDice());
  }

  throwProductionDie(): void {
    this.store.dispatch(GameActions.throwProductionDie());
  }

  setNextProductionDie(value: ResourceValue): void {
    this.store.dispatch(GameActions.setNextProductionDie({ value }));
  }

  throwEventDie(): void {
    this.store.dispatch(GameActions.throwEventDie());
  }

  setPhase(phase: GamePhase): void {
    this.store.dispatch(GameActions.setPhase({ phase }));
  }

  setPlayer(player: DomainColor): void {
    this.store.dispatch(GameActions.setPlayer({ player }));
  }

  setAction(action: ActionName | undefined): void {
    this.store.dispatch(GameActions.setAction({ action }));
  }
}
