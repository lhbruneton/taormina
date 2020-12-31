import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as HandsFeature from './hands.reducer';
import * as HandsActions from './hands.actions';

@Injectable()
export class HandsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsActions.initHandsNewGame),
      map(() => HandsActions.setHandsInitialized({ hands: [] }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsActions.initHandsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HandsActions.loadHandsSuccess({ hands: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return HandsActions.loadHandsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
