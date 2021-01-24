import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';

import * as CardsFeature from '../cards/cards.reducer';
import * as CardsSelectors from '../cards/cards.selectors';
import * as StockPilesFeature from '../stock-piles/stock-piles.reducer';
import * as StockPilesSelectors from '../stock-piles/stock-piles.selectors';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import { createInitialStockPileCards } from './stock-pile-cards.models';

@Injectable()
export class StockPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPileCardsActions.initStockPileCardsNewGame),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.cardsStore.select(CardsSelectors.getAllCards),
            this.stockPilesStore.select(StockPilesSelectors.getAllStockPiles)
          )
        )
      ),
      map(([action, cards, stockPiles]) =>
        StockPileCardsActions.setStockPileCardsInitialized({
          stockPileCards: createInitialStockPileCards(stockPiles, cards),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPileCardsActions.initStockPileCardsSavedGame),
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

  constructor(
    private actions$: Actions,
    private cardsStore: Store<CardsFeature.CardsPartialState>,
    private stockPilesStore: Store<StockPilesFeature.StockPilesPartialState>
  ) {}
}
