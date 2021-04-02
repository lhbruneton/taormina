import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { GamePhase } from '@taormina/shared-models';
import {
  getRandomEventDieValue,
  getRandomProductionDieValue,
} from '@taormina/shared-utils';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as DomainsCardsActions from '../domains-cards/domains-cards.actions';
import * as GameActions from './game.actions';
import { GamePartialState } from './game.reducer';
import * as GameSelectors from './game.selectors';

@Injectable()
export class GameEffects {
  throwDice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.throwDice),
      switchMap(() => [
        GameActions.throwEventDie(),
        GameActions.throwProductionDie(),
      ])
    )
  );

  throwProduction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.throwProductionDie),
      map(() => getRandomProductionDieValue()),
      withLatestFrom(this.gameStore.select(GameSelectors.getGamePhase)),
      switchMap(([value, phase]) => {
        const actions = [];
        actions.push(GameActions.setProductionDie({ value }));
        if (phase !== GamePhase.InitialThrow) {
          actions.push(
            DomainsCardsActions.increaseAvailableResourcesForDie({
              die: value,
            })
          );
        }
        return actions;
      })
    )
  );

  throwEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.throwEventDie),
      map(() => getRandomEventDieValue()),
      map((value) => GameActions.setEventDie({ value }))
    )
  );

  constructor(
    private actions$: Actions,
    private gameStore: Store<GamePartialState>
  ) {}
}
