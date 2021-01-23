import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { getShuffledInitialLandCards } from '../cards/models/land';

@Injectable()
export class LandsPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileCardsActions.initLandsPileCardsNewGame),
      map(() =>
        LandsPileCardsActions.setLandsPileCardsInitialized({
          landsPileCards: getShuffledInitialLandCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileCardsActions.initLandsPileCardsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return LandsPileCardsActions.loadLandsPileCardsSuccess({
            landsPileCards: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return LandsPileCardsActions.loadLandsPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
