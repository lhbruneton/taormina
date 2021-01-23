import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { createInitialAgglomerationCards } from '../cards/models/agglomeration';
import * as FaceUpPilesActions from './face-up-piles.actions';

@Injectable()
export class FaceUpPilesEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesActions.initFaceUpNewGame),
      map(() =>
        FaceUpPilesActions.setFaceUpPilesInitialized({
          agglomerationCards: createInitialAgglomerationCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesActions.initFaceUpSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FaceUpPilesActions.loadFaceUpPilesSuccess({
            agglomerationCards: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return FaceUpPilesActions.loadFaceUpPilesFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
