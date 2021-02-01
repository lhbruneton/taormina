import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import * as HandCardsActions from './hand-cards.actions';
import { createHandCardsEntity } from './hand-cards.models';

@Injectable()
export class HandCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandCardsActions.initHandCardsNewGame),
      map(() => HandCardsActions.setHandCardsInitialized({ handCards: [] }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandCardsActions.initHandCardsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HandCardsActions.loadHandCardsSuccess({ handCards: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return HandCardsActions.loadHandCardsFailure({ error });
        },
      })
    )
  );

  addCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandCardsActions.addCardsToHand),
      map(({ handId, cardIds }) =>
        cardIds.map((cardId) => createHandCardsEntity(uuidv4(), handId, cardId))
      ),
      map((handCards) => HandCardsActions.addHandCards({ handCards }))
    )
  );

  constructor(private actions$: Actions) {}
}
