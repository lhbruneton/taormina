import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { ID_DOMAIN_BLUE, ID_DOMAIN_RED } from '@taormina/shared-constants';
import { ResourceCount } from '@taormina/shared-models';
import { forkJoin, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import * as DomainsCardsActions from './domains-cards.actions';
import {
  createDomainsCardsEntity,
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

  increaseResourcesForDie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.increaseAvailableResourcesForDie),
      concatMap((action) => {
        return forkJoin({
          increaseOne: this.domainsCardsStore.pipe(
            select(
              DomainsCardsSelectors.getLandCardsPivotsIncreaseOneProduction,
              {
                die: action.die,
              }
            ),
            take(1)
          ),
          increaseTwo: this.domainsCardsStore.pipe(
            select(
              DomainsCardsSelectors.getLandCardsPivotsIncreaseTwoProduction,
              {
                die: action.die,
              }
            ),
            take(1)
          ),
        });
      }),
      map(({ increaseOne, increaseTwo }) => {
        const updatesOne = increaseOne
          // Update land cards with available resources below max by 1
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
        const updatesTwoOne = increaseTwo
          // Update land cards with available resources at (max - 1) by only 1
          .filter((pivot) => (pivot.availableResources as ResourceCount) == 2)
          .map((pivot) => {
            return {
              id: pivot.id,
              changes: {
                // prettier-ignore
                availableResources: (pivot.availableResources + 1) as ResourceCount,
              },
            };
          });
        const updatesTwoTwo = increaseTwo
          // Update land cards with available resources below (max - 1) by 2
          .filter((pivot) => (pivot.availableResources as ResourceCount) < 2)
          .map((pivot) => {
            return {
              id: pivot.id,
              changes: {
                // prettier-ignore
                availableResources: (pivot.availableResources + 2) as ResourceCount,
              },
            };
          });
        return DomainsCardsActions.updateDomainsCards({
          updates: [...updatesOne, ...updatesTwoOne, ...updatesTwoTwo],
        });
      })
    )
  );

  lockResource$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.lockResource),
      concatMap((action) =>
        this.takeOneDefinedPivotOrThrow(action.id).pipe(
          map((pivot) => {
            if (pivot.availableResources === 0) {
              throw new Error(
                `Can't lock unavailable resource for pivot ${pivot.id}.`
              );
            }
            if (pivot.lockedResources === 3) {
              throw new Error(
                `Can't lock more resources for pivot ${pivot.id}.`
              );
            }

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
            of(
              DomainsCardsActions.setDomainsCardsError({ error: error.message })
            )
          )
        )
      )
    )
  );

  unlockResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.unlockResources),
      concatMap((action) =>
        this.takeOneDefinedPivotOrThrow(action.id).pipe(
          map((pivot) => {
            if (pivot.availableResources + pivot.lockedResources > 3) {
              throw new Error(
                `Shouldn't have been able to lock so many resources for pivot ${pivot.id}.`
              );
            }

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
            of(
              DomainsCardsActions.setDomainsCardsError({ error: error.message })
            )
          )
        )
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

  increaseResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.increaseAvailableResources),
      concatMap((action) =>
        this.takeOneDefinedPivotOrThrow(action.id).pipe(
          map((pivot) => {
            if (pivot.availableResources === 3) {
              throw new Error(
                `Can't increase available resources beyond maximum for pivot ${pivot.id}.`
              );
            }

            const update = {
              id: pivot.id,
              changes: {
                // prettier-ignore
                availableResources: (pivot.availableResources + 1) as ResourceCount,
              },
            };
            return DomainsCardsActions.updateDomainCard({ update });
          }),
          catchError((error) =>
            of(
              DomainsCardsActions.setDomainsCardsError({ error: error.message })
            )
          )
        )
      )
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

  createCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.createDomainCard),
      map(({ domainId, cardType, cardId, col, row }) => {
        const domainCard = createDomainsCardsEntity(
          uuidv4(),
          domainId,
          cardType,
          cardId,
          col,
          row
        );
        return DomainsCardsActions.addDomainCard({ domainCard });
      })
    )
  );

  countStealResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.countAndStealUnprotectedGoldAndWool),
      withLatestFrom(
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getDomainResourceCountSeenByThieves,
          { domainId: ID_DOMAIN_RED }
        ),
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getDomainResourceCountSeenByThieves,
          { domainId: ID_DOMAIN_BLUE }
        ),
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures,
          { domainId: ID_DOMAIN_RED }
        ),
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getDomainUnprotectedGoldMinesAndPastures,
          { domainId: ID_DOMAIN_BLUE }
        )
      ),
      map(
        ([
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _action,
          redResourceCount,
          blueResourceCount,
          redGoldMinesAndPastures,
          blueGoldMinesAndPastures,
        ]) => {
          const thievesResourceCountThreshold = 7;
          let pivots: DomainsCardsEntity[] = [];
          if (redResourceCount > thievesResourceCountThreshold) {
            pivots = [...pivots, ...redGoldMinesAndPastures];
          }
          if (blueResourceCount > thievesResourceCountThreshold) {
            pivots = [...pivots, ...blueGoldMinesAndPastures];
          }
          return pivots;
        }
      ),
      map((pivots) => {
        const updates = pivots.map((pivot) => {
          return {
            id: pivot.id,
            changes: {
              availableResources: 0 as ResourceCount,
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

  private takeOneDefinedPivotOrThrow(
    id: string
  ): Observable<DomainsCardsEntity> {
    return this.domainsCardsStore.pipe(
      select(DomainsCardsSelectors.getLandCardPivotById, {
        id,
      }),
      map((pivot) => {
        if (pivot === undefined) {
          throw new Error(`Couldn't find land card pivot for id.`);
        }
        return pivot;
      }),
      take(1)
    );
  }
}
