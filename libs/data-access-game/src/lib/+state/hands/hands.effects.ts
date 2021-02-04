import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as HandsActions from './hands.actions';
import { createInitialHands } from './hands.models';

@Injectable()
export class HandsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsActions.initHandsNewGame),
      map(() =>
        HandsActions.setHandsInitialized({ hands: createInitialHands() })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsActions.initHandsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HandsActions.loadHandsSuccess({ hands: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return HandsActions.loadHandsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
