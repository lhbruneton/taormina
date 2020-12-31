import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as StockPileCardsFeature from './stock-pile-cards.reducer';
import * as StockPileCardsActions from './stock-pile-cards.actions';

@Injectable()
export class StockPileCardsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPileCardsActions.initStockPileCards),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return StockPileCardsActions.loadStockPileCardsSuccess({
            stockPileCards: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return StockPileCardsActions.loadStockPileCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
