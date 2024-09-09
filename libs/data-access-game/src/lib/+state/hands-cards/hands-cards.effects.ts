import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@ngrx/router-store/data-persistence';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import * as HandsCardsActions from './hands-cards.actions';
import { createHandsCardsEntity } from './hands-cards.models';

@Injectable()
export class HandsCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsCardsActions.initHandsCardsNewGame),
      map(() => HandsCardsActions.setHandsCardsInitialized({ handsCards: [] }))
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsCardsActions.initHandsCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return HandsCardsActions.loadHandsCardsSuccess({ handsCards: [] });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return HandsCardsActions.loadHandsCardsFailure({ error });
        },
      })
    )
  );

  addCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HandsCardsActions.addCardsToHand),
      map(({ handId, cards }) =>
        cards.map((card) =>
          createHandsCardsEntity(uuidv4(), handId, card.type, card.id)
        )
      ),
      map((handsCards) => HandsCardsActions.addHandsCards({ handsCards }))
    )
  );

  constructor(private actions$: Actions) {}
}
