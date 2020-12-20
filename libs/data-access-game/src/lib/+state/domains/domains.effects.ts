import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DomainsFeature from './domains.reducer';
import * as DomainsActions from './domains.actions';

@Injectable()
export class DomainsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsActions.init),
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
