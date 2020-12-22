import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EventsPileFeature from './events-pile.reducer';
import * as EventsPileActions from './events-pile.actions';

@Injectable()
export class EventsPileEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileActions.initEventsPile),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EventsPileActions.loadEventsPileSuccess({ eventsPile: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return EventsPileActions.loadEventsPileFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
