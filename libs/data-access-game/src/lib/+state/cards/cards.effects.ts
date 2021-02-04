import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { addCardsToHand } from '../hand-cards/hand-cards.actions';
import { removeCardsFromStockPile } from '../stock-pile-cards/stock-pile-cards.actions';
import * as StockPileCardsFeature from '../stock-pile-cards/stock-pile-cards.reducer';
import * as StockPileCardsSelectors from '../stock-pile-cards/stock-pile-cards.selectors';

import * as CardsActions from './cards.actions';
import * as CardsFeature from './cards.reducer';
import { createInitialActionCards } from './models/action';
import { createInitialDomainAgglomerationCards } from './models/agglomeration';
import { createInitialDevelopmentCards } from './models/development';
import { createInitialDomainLandCards } from './models/land';

@Injectable()
export class CardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.initCardsNewGame),
      map(() =>
        CardsActions.setCardsInitialized({
          cards: [
            ...createInitialDomainAgglomerationCards(),
            ...createInitialDomainLandCards(),
            ...createInitialActionCards(),
            ...createInitialDevelopmentCards(),
          ],
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.initCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return CardsActions.loadCardsSuccess({ cards: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return CardsActions.loadCardsFailure({ error });
        },
      })
    )
  );

  drawFromStockToHand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardsActions.drawCardsFromStockToHand),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.stockPileCardsStore.select(
              StockPileCardsSelectors.getAllStockPileCards
            )
          )
        )
      ),
      map(([action, stockPileCards]) => {
        return {
          stockPileId: action.stockPileId,
          cardIds: stockPileCards
            .filter(
              (stockPileCard) =>
                stockPileCard.stockPileId === action.stockPileId
            )
            .slice(0, action.cardsCount)
            .map((stockPileCard) => stockPileCard.cardId),
          handId: action.handId,
        };
      }),
      switchMap(({ stockPileId, cardIds, handId }) => [
        removeCardsFromStockPile({ stockPileId, cardIds }),
        addCardsToHand({ handId, cardIds }),
      ])
    )
  );

  constructor(
    private actions$: Actions,
    private cardsStore: Store<CardsFeature.CardsPartialState>,
    private stockPileCardsStore: Store<StockPileCardsFeature.StockPileCardsPartialState>
  ) {}
}
