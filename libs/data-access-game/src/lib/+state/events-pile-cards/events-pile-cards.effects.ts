import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { getShuffledInitialEventCards } from '../cards/models/event';

@Injectable()
export class EventsPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileCardsActions.initEventsPileCardsNewGame),
      map(() =>
        EventsPileCardsActions.setEventsPileCardsInitialized({
          eventsPileCards: getShuffledInitialEventCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileCardsActions.initEventsPileCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return EventsPileCardsActions.loadEventsPileCardsSuccess({
            eventsPileCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return EventsPileCardsActions.loadEventsPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
