import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as CardsActions from './cards.actions';
import { createInitialAgglomerationCards } from './models/agglomeration';
import { createInitialLandCards } from './models/land';

@Injectable()
export class CardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.initCardsNewGame),
      map(() =>
        CardsActions.setCardsInitialized({
          cards: [
            ...createInitialAgglomerationCards(),
            ...createInitialLandCards(),
          ],
        })
      )
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
