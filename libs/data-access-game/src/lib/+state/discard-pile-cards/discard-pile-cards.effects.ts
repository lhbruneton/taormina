import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DiscardPileCardsFeature from './discard-pile-cards.reducer';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';

@Injectable()
export class DiscardPileCardsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileCardsActions.initDiscardPileCards),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiscardPileCardsActions.loadDiscardPileCardsSuccess({
            discardPileCards: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DiscardPileCardsActions.loadDiscardPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
