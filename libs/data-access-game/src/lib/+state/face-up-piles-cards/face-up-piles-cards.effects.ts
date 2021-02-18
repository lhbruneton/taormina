import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { createInitialFaceUpPilesCards } from './face-up-piles-cards.models';

@Injectable()
export class FaceUpPilesCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesCardsActions.initFaceUpNewGame),
      map(() =>
        FaceUpPilesCardsActions.setFaceUpPilesCardsInitialized({
          agglomerationCards: createInitialFaceUpPilesCards(),
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
            agglomerationCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return FaceUpPilesCardsActions.loadFaceUpPilesCardsFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
