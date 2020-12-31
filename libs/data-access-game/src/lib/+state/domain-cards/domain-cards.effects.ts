import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DomainCardsFeature from './domain-cards.reducer';
import * as DomainCardsActions from './domain-cards.actions';

@Injectable()
export class DomainCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainCardsActions.initDomainCardsNewGame),
      map(() =>
        DomainCardsActions.setDomainCardsInitialized({
          domainCards: [],
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainCardsActions.initDomainCardsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DomainCardsActions.loadDomainCardsSuccess({ domainCards: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DomainCardsActions.loadDomainCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
