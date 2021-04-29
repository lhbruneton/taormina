import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  getRandomEventDieValue,
  getRandomProductionDieValue,
} from '@taormina/shared-utils';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

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
      withLatestFrom(
        this.gameStore.select(GameSelectors.getGameNextProductionDie)
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_action, nextProductionDie]) => {
        if (nextProductionDie !== undefined) {
          return nextProductionDie;
        } else {
          return getRandomProductionDieValue();
        }
      }),
      switchMap((value) => [
        GameActions.setProductionDie({ value }),
        GameActions.setNextProductionDie({ value: undefined }),
      ])
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
