import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as FaceUpPilesFeature from './face-up-piles.reducer';
import * as FaceUpPilesActions from './face-up-piles.actions';

@Injectable()
export class FaceUpPilesEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaceUpPilesActions.initFaceUp),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return FaceUpPilesActions.loadFaceUpPilesSuccess({ faceUpPiles: [] });
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