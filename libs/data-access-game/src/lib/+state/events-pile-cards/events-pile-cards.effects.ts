import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EventsPileCardsFeature from './events-pile-cards.reducer';
import * as EventsPileCardsActions from './events-pile-cards.actions';

@Injectable()
export class EventsPileCardsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileCardsActions.initEventsPileCards),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EventsPileCardsActions.loadEventsPileCardsSuccess({
            eventsPileCards: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return EventsPileCardsActions.loadEventsPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
