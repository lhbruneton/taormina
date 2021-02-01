import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { forkJoin, of } from 'rxjs';
import { concatMap, map, mergeMap, take, withLatestFrom } from 'rxjs/operators';

import * as CardsFeature from '../cards/cards.reducer';
import * as CardsSelectors from '../cards/cards.selectors';
import * as StockPilesFeature from '../stock-piles/stock-piles.reducer';
import * as StockPilesSelectors from '../stock-piles/stock-piles.selectors';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import { createInitialStockPileCards } from './stock-pile-cards.models';
import * as StockPileCardsFeature from './stock-pile-cards.reducer';
import * as StockPileCardsSelectors from './stock-pile-cards.selectors';

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

  removeCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPileCardsActions.removeCardsFromStockPile),
      mergeMap((action) =>
        forkJoin(
          action.cardIds.map((cardId) =>
            this.stockPileCardsStore.pipe(
              select(
                StockPileCardsSelectors.getStockPileCardEntityByStockPileIdCardId,
                { stockPileId: action.stockPileId, cardId }
              ),
              take(1)
            )
          )
        )
      ),
      map((stockPileCards) =>
        stockPileCards.map((stockPileCard) => stockPileCard.id)
      ),
      map((stockPileCardIds) =>
        StockPileCardsActions.removeStockPileCards({ stockPileCardIds })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cardsStore: Store<CardsFeature.CardsPartialState>,
    private stockPileCardsStore: Store<
      StockPileCardsFeature.StockPileCardsPartialState
    >,
    private stockPilesStore: Store<StockPilesFeature.StockPilesPartialState>
  ) {}
}
