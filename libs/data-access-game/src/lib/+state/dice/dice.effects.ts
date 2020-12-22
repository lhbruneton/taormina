import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DiceFeature from './dice.reducer';
import * as DiceActions from './dice.actions';

@Injectable()
export class DiceEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.initDice),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiceActions.loadDiceSuccess({ dice: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiceActions.loadDiceFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
