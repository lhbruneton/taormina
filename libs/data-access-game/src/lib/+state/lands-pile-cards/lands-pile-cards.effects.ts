import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nx/angular';
import { map } from 'rxjs/operators';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { createInitialLandsPileCards } from './lands-pile-cards.models';

@Injectable()
export class LandsPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileCardsActions.initLandsPileCardsNewGame),
      map(() =>
        LandsPileCardsActions.setLandsPileCardsInitialized({
          landsPileCards: createInitialLandsPileCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileCardsActions.initLandsPileCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return LandsPileCardsActions.loadLandsPileCardsSuccess({
            landsPileCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return LandsPileCardsActions.loadLandsPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
