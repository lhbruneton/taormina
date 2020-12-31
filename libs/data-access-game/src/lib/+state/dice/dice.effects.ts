import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DiceFeature from './dice.reducer';
import * as DiceActions from './dice.actions';

@Injectable()
export class DiceEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.initDiceNewGame),
      map(() => DiceActions.setDiceInitialized({ dice: [] }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiceActions.initDiceSavedGame),
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
