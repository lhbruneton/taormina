import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import { createInitialEventsPileCards } from './events-pile-cards.models';

@Injectable()
export class EventsPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileCardsActions.initEventsPileCardsNewGame),
      map(() =>
        EventsPileCardsActions.setEventsPileCardsInitialized({
          eventsPileCards: createInitialEventsPileCards(),
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
