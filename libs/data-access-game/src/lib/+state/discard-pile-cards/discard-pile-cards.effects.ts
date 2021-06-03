import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { createDiscardPileCardsEntity } from './discard-pile-cards.models';

@Injectable()
export class DiscardPileCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileCardsActions.initDiscardPileCardsNewGame),
      map(() =>
        DiscardPileCardsActions.setDiscardPileCardsInitialized({
          discardPileCards: [],
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileCardsActions.initDiscardPileCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DiscardPileCardsActions.loadDiscardPileCardsSuccess({
            discardPileCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return DiscardPileCardsActions.loadDiscardPileCardsFailure({ error });
        },
      })
    )
  );

  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscardPileCardsActions.addCardToDiscardPile),
      map(({ card }) =>
        createDiscardPileCardsEntity(uuidv4(), card.type, card.id)
      ),
      map((discardPileCard) =>
        DiscardPileCardsActions.addDiscardPileCard({ discardPileCard })
      )
    )
  );

  constructor(private actions$: Actions) {}
}
