import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { concatMap, map, take } from 'rxjs/operators';
import { ResourceCount } from '@taormina/shared-models';

import * as DomainsCardsActions from './domains-cards.actions';
import { createInitialDomainsCards } from './domains-cards.models';
import * as DomainsCardsFeature from './domains-cards.reducer';
import * as DomainsCardsSelectors from './domains-cards.selectors';

@Injectable()
export class DomainsCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.initDomainsCardsNewGame),
      map(() =>
        DomainsCardsActions.setDomainsCardsInitialized({
          domainsCards: createInitialDomainsCards(),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.initDomainsCardsSavedGame),
      fetch({
        run: () => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DomainsCardsActions.loadDomainsCardsSuccess({
            domainsCards: [],
          });
        },

        onError: (_action, error) => {
          console.error('Error', error);
          return DomainsCardsActions.loadDomainsCardsFailure({ error });
        },
      })
    )
  );

  increaseResourceValue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.increaseAvailableResourcesForDie),
      concatMap((action) =>
        this.domainsCardsStore.pipe(
          select(DomainsCardsSelectors.getLandCardsPivotsForDie, {
            die: action.die,
          }),
          take(1)
        )
      ),
      map((pivots) => {
        const updates = pivots
          // Don't update land cards already at max available resources
          .filter((pivot) => (pivot.availableResources as ResourceCount) < 3)
          .map((pivot) => {
            return {
              id: pivot.id,
              changes: {
                // prettier-ignore
                availableResources: (pivot.availableResources + 1) as ResourceCount,
              },
            };
          });
        return DomainsCardsActions.updateDomainsCards({ updates });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private domainsCardsStore: Store<DomainsCardsFeature.DomainsCardsPartialState>
  ) {}
}
