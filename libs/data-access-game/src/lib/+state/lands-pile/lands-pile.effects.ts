import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LandsPileFeature from './lands-pile.reducer';
import * as LandsPileActions from './lands-pile.actions';

@Injectable()
export class LandsPileEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LandsPileActions.initLandsPile),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return LandsPileActions.loadLandsPileSuccess({ landsPile: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return LandsPileActions.loadLandsPileFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
