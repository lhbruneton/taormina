import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import { concatMap, map, withLatestFrom } from 'rxjs/operators';

import * as CardsFeature from '../cards/cards.reducer';
import * as CardsSelectors from '../cards/cards.selectors';
import * as DomainsFeature from '../domains/domains.reducer';
import * as DomainsSelectors from '../domains/domains.selectors';
import * as DomainCardsActions from './domain-cards.actions';
import { createInitialDomainCards } from './domain-cards.models';

@Injectable()
export class DomainCardsEffects {
  initNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainCardsActions.initDomainCardsNewGame),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(
            this.cardsStore.select(CardsSelectors.getAllCards),
            this.domainsStore.select(DomainsSelectors.getAllDomains)
          )
        )
      ),
      map(([action, cards, domains]) =>
        DomainCardsActions.setDomainCardsInitialized({
          domainCards: domains.flatMap((domain) =>
            createInitialDomainCards(domain, cards)
          ),
        })
      )
    )
  );

  initSavedGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DomainCardsActions.initDomainCardsSavedGame),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return DomainCardsActions.loadDomainCardsSuccess({ domainCards: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return DomainCardsActions.loadDomainCardsFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cardsStore: Store<CardsFeature.CardsPartialState>,
    private domainsStore: Store<DomainsFeature.DomainsPartialState>
  ) {}
}
