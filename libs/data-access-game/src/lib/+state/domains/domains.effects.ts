import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DomainsActions from './domains.actions';
import { createInitialDomains } from './domains.models';

@Injectable()
export class DomainsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsActions.initDomainsNewGame),
      map(() =>
        DomainsActions.setDomainsInitialized({
          domains: createInitialDomains(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsActions.initDomainsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DomainsActions.loadDomainsSuccess({ domains: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return DomainsActions.loadDomainsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
