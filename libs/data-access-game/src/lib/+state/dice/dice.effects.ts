import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DiceActions from './dice.actions';
import { createRandomDice } from './dice.models';

@Injectable()
export class DiceEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.initDiceNewGame),
      map(() => {
        const dice = createRandomDice();
        return DiceActions.setDiceInitialized({ dice });
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
      map(() => {
        const dice = createRandomDice();
        return DiceActions.upsertDice({ dice });
      })
    )
  );

  constructor(private actions$: Actions) {}
}
