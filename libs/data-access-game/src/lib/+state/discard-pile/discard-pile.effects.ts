import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DiscardPileFeature from './discard-pile.reducer';
import * as DiscardPileActions from './discard-pile.actions';

@Injectable()
export class DiscardPileEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiscardPileActions.loadDiscardPileSuccess({ discardPile: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiscardPileActions.loadDiscardPileFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
