import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nx/angular';
import { of } from 'rxjs';
import { catchError, concatMap, map, take } from 'rxjs/operators';

import * as AgglomerationPilesCardsActions from './agglomeration-piles-cards.actions';
import { createInitialAgglomerationPilesCards } from './agglomeration-piles-cards.models';
import * as AgglomerationPilesCardsFeature from './agglomeration-piles-cards.reducer';
import * as AgglomerationPilesCardsSelectors from './agglomeration-piles-cards.selectors';

@Injectable()
export class AgglomerationPilesCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgglomerationPilesCardsActions.initAgglomerationNewGame),
      map(() =>
        AgglomerationPilesCardsActions.setAgglomerationPilesCardsInitialized({
          agglomerationPilesCards: createInitialAgglomerationPilesCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AgglomerationPilesCardsActions.initAgglomerationSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AgglomerationPilesCardsActions.loadAgglomerationPilesCardsSuccess(
            {
              agglomerationPilesCards: [],
            }
          );
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return AgglomerationPilesCardsActions.loadAgglomerationPilesCardsFailure(
            { error }
          );
        },
      })
    )
  );

  selectFirst$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AgglomerationPilesCardsActions.selectFirstCardFromAgglomerationPile
      ),
      concatMap((action) =>
        this.agglomerationPilesCardsStore.pipe(
          select(
            AgglomerationPilesCardsSelectors.getFirstCardPivotForPile(
              action.pileId
            )
          ),
          map((pivot) => {
            if (pivot === undefined) {
              throw new Error(
                `Can't get first card in empty agglomeration pile.`
              );
            }
            return pivot;
          }),
          take(1),
          map((pivot) =>
            AgglomerationPilesCardsActions.selectAgglomerationPileCard({
              id: pivot.id,
            })
          ),
          catchError((error) =>
            of(
              AgglomerationPilesCardsActions.setAgglomerationPilesCardsError({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private agglomerationPilesCardsStore: Store<AgglomerationPilesCardsFeature.AgglomerationPilesCardsPartialState>
  ) {}
}
