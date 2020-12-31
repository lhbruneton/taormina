import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LandsPileCardsFeature from './lands-pile-cards.reducer';
import * as LandsPileCardsActions from './lands-pile-cards.actions';

@Injectable()
export class LandsPileCardsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileCardsActions.initLandsPileCards),
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
