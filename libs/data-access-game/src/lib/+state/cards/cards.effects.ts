import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as CardsFeature from './cards.reducer';
import * as CardsActions from './cards.actions';
import { createNewCards } from './cards.models';

@Injectable()
export class CardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.initCardsNewGame),
      map(() => CardsActions.setCardsInitialized({ cards: createNewCards() }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.initCardsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CardsActions.loadCardsSuccess({ cards: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return CardsActions.loadCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
