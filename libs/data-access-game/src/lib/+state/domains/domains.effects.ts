import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as DomainsFeature from './domains.reducer';
import * as DomainsActions from './domains.actions';
import { createNewDomainsDuel } from './domains.models';

@Injectable()
export class DomainsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsActions.initDomainsNewGame),
      map(() =>
        DomainsActions.setDomainsInitialized({
          domains: createNewDomainsDuel(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsActions.initDomainsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DomainsActions.loadDomainsSuccess({ domains: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DomainsActions.loadDomainsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
