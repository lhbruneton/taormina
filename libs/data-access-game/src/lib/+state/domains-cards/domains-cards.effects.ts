import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { ResourceCount } from '@taormina/shared-models';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  take,
  withLatestFrom,
} from 'rxjs/operators';

import * as DomainsCardsActions from './domains-cards.actions';
import {
  createInitialDomainsCards,
  DomainsCardsEntity,
} from './domains-cards.models';
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

  lockResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.lockResource),
      concatMap((action) => this.takeOneDefinedPivotOrThrow(action.id)),
      map((pivot) => {
        if (pivot.availableResources === 0)
          throw new Error(
            `Can't lock unavailable resource for pivot ${pivot.id}.`
          );
        if (pivot.lockedResources === 3)
          throw new Error(`Can't lock more resources for pivot ${pivot.id}.`);

        const update = {
          id: pivot.id,
          changes: {
            // prettier-ignore
            availableResources: (pivot.availableResources - 1) as ResourceCount,
            // prettier-ignore
            lockedResources: (pivot.lockedResources + 1) as ResourceCount,
          },
        };
        return DomainsCardsActions.updateDomainCard({ update });
      }),
      catchError((error) =>
        of(DomainsCardsActions.setDomainsCardsError({ error }))
      )
    )
  );

  unlockResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.unlockResources),
      concatMap((action) => this.takeOneDefinedPivotOrThrow(action.id)),
      map((pivot) => {
        if (pivot.availableResources + pivot.lockedResources > 3)
          throw new Error(
            `Shouldn't have been able to lock so many resources for pivot ${pivot.id}.`
          );

        const update = {
          id: pivot.id,
          changes: {
            availableResources: (pivot.availableResources +
              pivot.lockedResources) as ResourceCount,
            lockedResources: 0 as ResourceCount,
          },
        };
        return DomainsCardsActions.updateDomainCard({ update });
      }),
      catchError((error) =>
        of(DomainsCardsActions.setDomainsCardsError({ error }))
      )
    )
  );

  useLockedResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.useLockedResources),
      withLatestFrom(
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getLandCardPivotWithLockedResources
        )
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map(([_action, pivots]) => {
        const updates = pivots.map((pivot) => {
          return {
            id: pivot.id,
            changes: {
              lockedResources: 0 as ResourceCount,
            },
          };
        });
        return DomainsCardsActions.updateDomainsCards({ updates });
      })
    )
  );

  putCardInPivot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.putCardInPivot),
      map((action) => {
        const update = {
          id: action.id,
          changes: {
            cardType: action.cardType,
            cardId: action.cardId,
          },
        };
        return DomainsCardsActions.updateDomainCard({ update });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private domainsCardsStore: Store<DomainsCardsFeature.DomainsCardsPartialState>
  ) {}

  private takeOneDefinedPivotOrThrow(
    id: string
  ): Observable<DomainsCardsEntity> {
    return this.domainsCardsStore.pipe(
      select(DomainsCardsSelectors.getLandCardPivotById, {
        id,
      }),
      map((pivot) => {
        if (pivot === undefined)
          throw new Error(`Couldn't find land card pivot for id.`);
        return pivot;
      }),
      take(1)
    );
  }
}
