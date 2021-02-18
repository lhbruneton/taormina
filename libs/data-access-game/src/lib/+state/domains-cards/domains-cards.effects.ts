import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DomainsCardsActions from './domains-cards.actions';
import { createInitialDomainsCards } from './domains-cards.models';

@Injectable()
export class DomainsCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.initDomainsCardsNewGame),
      map(() =>
        DomainsCardsActions.setDomainsCardsInitialized({
          domainsCards: createInitialDomainsCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.initDomainsCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DomainsCardsActions.loadDomainsCardsSuccess({
            domainsCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return DomainsCardsActions.loadDomainsCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
