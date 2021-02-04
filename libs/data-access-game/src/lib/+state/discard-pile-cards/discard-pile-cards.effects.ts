import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';

@Injectable()
export class DiscardPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileCardsActions.initDiscardPileCardsNewGame),
      map(() =>
        DiscardPileCardsActions.setDiscardPileCardsInitialized({
          discardPileCards: [],
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileCardsActions.initDiscardPileCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiscardPileCardsActions.loadDiscardPileCardsSuccess({
            discardPileCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return DiscardPileCardsActions.loadDiscardPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
