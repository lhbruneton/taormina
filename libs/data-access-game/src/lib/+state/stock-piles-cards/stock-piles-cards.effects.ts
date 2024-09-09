import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@ngrx/router-store/data-persistence';
import { forkJoin } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import {
  createInitialStockPilesCards,
  createStockPilesCardsEntity,
  StockPilesCardsEntity,
} from './stock-piles-cards.models';
import * as StockPilesCardsFeature from './stock-piles-cards.reducer';
import * as StockPilesCardsSelectors from './stock-piles-cards.selectors';

@Injectable()
export class StockPilesCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesCardsActions.initStockPilesCardsNewGame),
      map(() =>
        StockPilesCardsActions.setStockPilesCardsInitialized({
          stockPilesCards: createInitialStockPilesCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesCardsActions.initStockPilesCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return StockPilesCardsActions.loadStockPilesCardsSuccess({
            stockPilesCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return StockPilesCardsActions.loadStockPilesCardsFailure({ error });
        },
      })
    )
  );

  removeCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesCardsActions.removeCardsFromStockPileTop),
      mergeMap((action) =>
        forkJoin(
          action.cards.map(({ type: cardType, id: cardId }) =>
            this.stockPilesCardsStore.pipe(
              select(
                StockPilesCardsSelectors.getStockPileCardEntityByPivot(
                  action.pileId,
                  cardType,
                  cardId
                )
              ),
              take(1)
            )
          )
        )
      ),
      map((stockPilesCards) =>
        stockPilesCards
          // TODO: throw error instead of filtering out undefined ?
          .filter(
            (stockPileCard): stockPileCard is StockPilesCardsEntity =>
              stockPileCard !== undefined
          )
          .map((stockPileCard) => stockPileCard.id)
      ),
      map((ids) => StockPilesCardsActions.removeStockPilesCards({ ids }))
    )
  );

  addCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StockPilesCardsActions.addCardsToStockPileBottom),
      map(({ pileId, cards }) =>
        cards.map((card) =>
          createStockPilesCardsEntity(uuidv4(), pileId, card.type, card.id)
        )
      ),
      map((stockPilesCards) =>
        StockPilesCardsActions.addStockPilesCards({ stockPilesCards })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private stockPilesCardsStore: Store<StockPilesCardsFeature.StockPilesCardsPartialState>
  ) {}
}
