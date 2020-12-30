import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DomainCardsFeature from './domain-cards.reducer';
import * as DomainCardsActions from './domain-cards.actions';

@Injectable()
export class DomainCardsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainCardsActions.initDomainCards),
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
