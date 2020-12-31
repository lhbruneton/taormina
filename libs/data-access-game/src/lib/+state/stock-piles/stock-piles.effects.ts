import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as StockPilesFeature from './stock-piles.reducer';
import * as StockPilesActions from './stock-piles.actions';

@Injectable()
export class StockPilesEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesActions.initStockPilesNewGame),
      map(() => StockPilesActions.setStockPilesInitialized({ stockPiles: [] }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesActions.initStockPilesSavedGame),
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
