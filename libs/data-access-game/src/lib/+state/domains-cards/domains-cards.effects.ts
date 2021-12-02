import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import {
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  landCards,
} from '@taormina/shared-constants';
import {
  LandCard,
  ResourceCount,
  RESOURCE_COUNTS,
} from '@taormina/shared-models';
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
        const updatesOne = this.updatesAvailableResources(increaseOne, 1);
        // eslint-disable-next-line no-magic-numbers
        const updatesTwo = this.updatesAvailableResources(increaseTwo, 2);
        return DomainsCardsActions.updateDomainsCards({
          updates: [...updatesOne, ...updatesTwo],
        });
      })
    )
  );

  increaseResourcesAuspiciousYear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.increaseAvailableResourcesForAuspiciousYear),
      withLatestFrom(
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear,
          { count: 1 }
        ),
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear,
          { count: 2 }
        ),
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear,
          { count: 3 }
        ),
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getLandCardsPivotsIncreaseAuspiciousYear,
          { count: 4 }
        )
      ),
      map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_action, increaseOne, increaseTwo, increaseThree, increaseFour]) => {
          const updatesOne = this.updatesAvailableResources(increaseOne, 1);
          /* eslint-disable no-magic-numbers */
          const updatesTwo = this.updatesAvailableResources(increaseTwo, 2);
          const updatesThree = this.updatesAvailableResources(increaseThree, 3);
          const updatesFour = this.updatesAvailableResources(increaseFour, 4);
          /* eslint-enable no-magic-numbers */
          return DomainsCardsActions.updateDomainsCards({
            updates: [
              ...updatesOne,
              ...updatesTwo,
              ...updatesThree,
              ...updatesFour,
            ],
          });
        }
      )
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
            if (pivot.lockedResources === Math.max(...RESOURCE_COUNTS)) {
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
            if (
              pivot.availableResources + pivot.lockedResources >
              Math.max(...RESOURCE_COUNTS)
            ) {
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

  giveLockedResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.giveLockedResources),
      withLatestFrom(
        this.domainsCardsStore.select(
          DomainsCardsSelectors.getLandCardPivotWithLockedResources
        )
      ),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      concatMap(([_action, pivotsWithLockedResources]) =>
        this.domainsCardsStore.pipe(
          select(DomainsCardsSelectors.getDomainsCardsSelected),
          take(1),
          map((pivotsSelected) => {
            if (pivotsWithLockedResources.length === 0) {
              throw new Error(
                `Can't give locked resources if no pivots with locked resources.`
              );
            }
            const firstPivot = pivotsWithLockedResources[0];
            const firstLand = this.getLandCardFromPivot(firstPivot);
            let count = 0;
            pivotsWithLockedResources.forEach((pivot) => {
              const land = this.getLandCardFromPivot(pivot);
              if (land.type !== firstLand.type) {
                throw new Error(
                  `Can't give locked resources of different types.`
                );
              }
              count += pivot.lockedResources;
            });

            const updatesLocked = pivotsWithLockedResources.map((pivot) => {
              return {
                id: pivot.id,
                changes: {
                  lockedResources: 0 as ResourceCount,
                },
              };
            });

            if (pivotsSelected.length !== 1) {
              throw new Error(
                `Can't give locked resources if no pivot or more than one pivot selected.`
              );
            }
            const selectedPivot = pivotsSelected[0];
            const selectedLand = this.getLandCardFromPivot(selectedPivot);
            if (selectedLand.type !== firstLand.type) {
              throw new Error(
                `Can't give locked resources to pivot of different type.`
              );
            }

            const sumResources = selectedPivot.availableResources + count;
            if (sumResources > Math.max(...RESOURCE_COUNTS)) {
              throw new Error(
                `Can't give so many locked resources to selected pivot.`
              );
            }

            const updateAvailable = {
              id: selectedPivot.id,
              changes: {
                availableResources: sumResources as ResourceCount,
              },
            };

            return DomainsCardsActions.updateDomainsCards({
              updates: [...updatesLocked, updateAvailable],
            });
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

  increaseResources$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainsCardsActions.increaseAvailableResources),
      concatMap((action) =>
        this.takeOneDefinedPivotOrThrow(action.id).pipe(
          map((pivot) => {
            if (pivot.availableResources === Math.max(...RESOURCE_COUNTS)) {
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

  private updatesAvailableResources = (
    domainsCards: DomainsCardsEntity[],
    resourceIncrement: number
  ): {
    id: string;
    changes: {
      availableResources: ResourceCount;
    };
  }[] => {
    const belowMax = domainsCards
      .filter(
        (pivot) =>
          pivot.availableResources <
          Math.max(...RESOURCE_COUNTS) - resourceIncrement
      )
      .map((pivot) => {
        return {
          id: pivot.id,
          changes: {
            availableResources: (pivot.availableResources +
              resourceIncrement) as ResourceCount,
          },
        };
      });

    const atMax = domainsCards
      .filter(
        (pivot) =>
          pivot.availableResources >=
            Math.max(...RESOURCE_COUNTS) - resourceIncrement &&
          pivot.availableResources < Math.max(...RESOURCE_COUNTS)
      )
      .map((pivot) => {
        return {
          id: pivot.id,
          changes: {
            availableResources: Math.max(...RESOURCE_COUNTS) as ResourceCount,
          },
        };
      });

    return [...belowMax, ...atMax];
  };

  private getLandCardFromPivot(pivot: DomainsCardsEntity): LandCard {
    if (pivot.cardId === undefined) {
      throw new Error(
        `Something went wrong, cardId shouldn't be undefined at this point.`
      );
    }
    const land = landCards.get(pivot.cardId);
    if (land === undefined) {
      throw new Error(
        `Something went wrong, land shouldn't be undefined at this point.`
      );
    }
    return land;
  }
}
