import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DomainCardType, masteryPointsType } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as DomainsCardsActions from './domains-cards.actions';
import * as DomainsCardsFeature from './domains-cards.reducer';
import * as DomainsCardsSelectors from './domains-cards.selectors';

@Injectable()
export class DomainsCardsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(DomainsCardsSelectors.getDomainsCardsLoaded)
  );
  allDomainsCards$ = this.store.pipe(
    select(DomainsCardsSelectors.getAllDomainsCards)
  );
  selectedDomainsCards$ = this.store.pipe(
    select(DomainsCardsSelectors.getDomainsCardsSelected)
  );

  constructor(
    private store: Store<DomainsCardsFeature.DomainsCardsPartialState>
  ) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  initNewGame(): void {
    this.store.dispatch(DomainsCardsActions.initDomainsCardsNewGame());
  }

  initSavedGame(): void {
    this.store.dispatch(DomainsCardsActions.initDomainsCardsSavedGame());
  }

  lockResource(pivotId: string): void {
    this.store.dispatch(DomainsCardsActions.lockResource({ id: pivotId }));
  }

  unlockResources(pivotId: string): void {
    this.store.dispatch(DomainsCardsActions.unlockResources({ id: pivotId }));
  }

  increaseResources(pivotId: string): void {
    this.store.dispatch(
      DomainsCardsActions.increaseAvailableResources({ id: pivotId })
    );
  }

  useLockedResources(): void {
    this.store.dispatch(DomainsCardsActions.useLockedResources());
  }

  selectDomainCard(pivotId: string): void {
    this.store.dispatch(DomainsCardsActions.selectDomainCard({ id: pivotId }));
  }

  unselectDomainCard(): void {
    this.store.dispatch(DomainsCardsActions.unselectDomainCard());
  }

  putCardInSlot(
    pivotId: string,
    cardType: DomainCardType,
    cardId: string
  ): void {
    this.store.dispatch(
      DomainsCardsActions.putCardInPivot({
        id: pivotId,
        cardType,
        cardId,
      })
    );
  }

  createAvailableDomainCard(
    domainId: string,
    cardType: DomainCardType,
    col: number,
    row: number
  ): void {
    this.store.dispatch(
      DomainsCardsActions.createDomainCard({
        domainId,
        cardType,
        cardId: undefined,
        col,
        row,
      })
    );
  }

  getDomainMinCol(domainId: string): Observable<number> {
    return this.store.pipe(
      select(DomainsCardsSelectors.getDomainMinCol, { domainId })
    );
  }

  getDomainMaxCol(domainId: string): Observable<number> {
    return this.store.pipe(
      select(DomainsCardsSelectors.getDomainMaxCol, { domainId })
    );
  }

  getMasteryDomainForType(
    type: masteryPointsType
  ): Observable<string | undefined> {
    return this.store.pipe(
      select(DomainsCardsSelectors.getMasteryDomainForType, { type })
    );
  }
}
