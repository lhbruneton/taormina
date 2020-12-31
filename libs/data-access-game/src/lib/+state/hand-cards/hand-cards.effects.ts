import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as HandCardsFeature from './hand-cards.reducer';
import * as HandCardsActions from './hand-cards.actions';

@Injectable()
export class HandCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandCardsActions.initHandCardsNewGame),
      map(() => HandCardsActions.setHandCardsInitialized({ handCards: [] }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandCardsActions.initHandCardsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HandCardsActions.loadHandCardsSuccess({ handCards: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return HandCardsActions.loadHandCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
