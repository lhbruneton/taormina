import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import { createInitialEventsPileCards } from './events-pile-cards.models';
import * as EventsPileCardsFeature from './events-pile-cards.reducer';
import * as EventsPileCardsSelectors from './events-pile-cards.selectors';

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

  selectFirst$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileCardsActions.selectFirstEventsPileCard),
      withLatestFrom(
        this.eventsPileCardsStore.select(
          EventsPileCardsSelectors.getAllEventsPileCards
        )
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_action, pivots]) => {
        return EventsPileCardsActions.selectEventsPileCard({
          id: pivots[0].id,
        });
      })
    )
  );

  removeSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsPileCardsActions.removeSelectedEventsPileCard),
      withLatestFrom(
        this.eventsPileCardsStore.select(
          EventsPileCardsSelectors.getEventsPileCardsSelectedId
        )
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      filter(([_action, selectedId]) => selectedId !== undefined),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      switchMap(([_action, selectedId]) => [
        EventsPileCardsActions.removeEventsPileCard({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          id: selectedId!,
        }),
        EventsPileCardsActions.unselectEventsPileCard(),
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private eventsPileCardsStore: Store<EventsPileCardsFeature.EventsPileCardsPartialState>
  ) {}
}
