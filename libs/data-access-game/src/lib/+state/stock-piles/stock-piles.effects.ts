import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as StockPilesFeature from './stock-piles.reducer';
import * as StockPilesActions from './stock-piles.actions';

@Injectable()
export class StockPilesEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return StockPilesActions.loadStockPilesSuccess({ stockPiles: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return StockPilesActions.loadStockPilesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
