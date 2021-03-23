import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { catchError, concatMap, map, take } from 'rxjs/operators';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { createInitialFaceUpPilesCards } from './face-up-piles-cards.models';
import * as FaceUpPilesCardsFeature from './face-up-piles-cards.reducer';
import * as FaceUpPilesCardsSelectors from './face-up-piles-cards.selectors';

@Injectable()
export class FaceUpPilesCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesCardsActions.initFaceUpNewGame),
      map(() =>
        FaceUpPilesCardsActions.setFaceUpPilesCardsInitialized({
          faceUpPilesCards: createInitialFaceUpPilesCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesCardsActions.initFaceUpSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess({
            faceUpPilesCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return FaceUpPilesCardsActions.loadFaceUpPilesCardsFailure({ error });
        },
      })
    )
  );

  selectFirst$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesCardsActions.selectFirstCardFromFaceUpPile),
      concatMap((action) =>
        this.faceUpPilesCardsStore.pipe(
          select(FaceUpPilesCardsSelectors.getFirstCardPivotForPile, {
            pileId: action.pileId,
          }),
          map((pivot) => {
            if (pivot === undefined)
              throw new Error(`Can't get first card in empty face up pile.`);
            return pivot;
          }),
          take(1),
          map((pivot) =>
            FaceUpPilesCardsActions.selectFaceUpPileCard({
              id: pivot.id,
            })
          ),
          catchError((error) =>
            of(
              FaceUpPilesCardsActions.setFaceUpPilesCardsError({
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
    private faceUpPilesCardsStore: Store<FaceUpPilesCardsFeature.FaceUpPilesCardsPartialState>
  ) {}
}
