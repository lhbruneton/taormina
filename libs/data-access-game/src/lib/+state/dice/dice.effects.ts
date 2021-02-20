import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';

import * as DomainsCardsActions from '../domains-cards/domains-cards.actions';
import * as DiceActions from './dice.actions';
import { createRandomDice } from './dice.models';

@Injectable()
export class DiceEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.initDiceNewGame),
      map(() => {
        const dice = createRandomDice();
        return DiceActions.setDiceInitialized({ dice: Object.values(dice) });
      })
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.initDiceSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiceActions.loadDiceSuccess({ dice: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return DiceActions.loadDiceFailure({ error });
        },
      })
    )
  );

  throw$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.throwDice),
      map(() => createRandomDice()),
      switchMap((dice) => [
        DiceActions.upsertDice({ dice: Object.values(dice) }),
        DomainsCardsActions.increaseLandValueForDie({
          die: dice.resource.value,
        }),
      ])
    )
  );

  constructor(private actions$: Actions) {}
}
