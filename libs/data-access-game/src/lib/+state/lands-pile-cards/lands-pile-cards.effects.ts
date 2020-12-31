import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as LandsPileCardsFeature from './lands-pile-cards.reducer';
import * as LandsPileCardsActions from './lands-pile-cards.actions';

@Injectable()
export class LandsPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileCardsActions.initLandsPileCardsNewGame),
      map(() =>
        LandsPileCardsActions.setLandsPileCardsInitialized({
          landsPileCards: [],
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
