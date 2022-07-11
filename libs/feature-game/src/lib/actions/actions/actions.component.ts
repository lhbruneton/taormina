import { Component } from '@angular/core';
import {
  DomainsCardsEntity,
  DomainsCardsFacade,
  AgglomerationPilesCardsEntity,
  AgglomerationPilesCardsFacade,
  GameFacade,
  HandsCardsEntity,
  HandsCardsFacade,
  LandsPileCardsEntity,
  LandsPileCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import {
  ACTION_CARD_INTERFACE_NAME,
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  GamePhase,
  LAND_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'taormina-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css'],
})
export class ActionsComponent {
  constructor(
    private game: GameFacade,
    private domainsCards: DomainsCardsFacade,
    private handsCards: HandsCardsFacade,
    private agglomerationPilesCards: AgglomerationPilesCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private gameRules: GameRulesService
  ) {}

  buyDisabled(): Observable<boolean> {
    return this.game.phase$.pipe(
      map((phase) => phase !== GamePhase.LoopActions)
    );
  }

  buyAgglomeration(): void {
    this.gameRules.useResourcesToPutAgglomerationPileCardInSlot();
  }

  getSelectedAgglomerationPileCard(): Observable<
    AgglomerationPilesCardsEntity | undefined
  > {
    return this.agglomerationPilesCards.selectedAgglomerationPilesCards$;
  }

  getSelectedAvailableAgglomerationSlots(): Observable<
    DomainsCardsEntity[]
    // eslint-disable-next-line indent
  > {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === AVAILABLE_AGGLOMERATION_SLOT
        )
      )
    );
  }

  getDomainSelectedAgglomerationSlots(): Observable<
    DomainsCardsEntity[]
    // eslint-disable-next-line indent
  > {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) =>
            domainCard?.cardType === AGGLOMERATION_CARD_INTERFACE_NAME
        )
      )
    );
  }

  buyDevelopment(): void {
    this.gameRules.useResourcesToPutHandCardInSlot();
  }

  getHandSelectedDevelopmentCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$.pipe(
      filter(
        (handCard) => handCard?.cardType === DEVELOPMENT_CARD_INTERFACE_NAME
      )
    );
  }

  getSelectedAvailableDevelopmentSlots(): Observable<
    DomainsCardsEntity[]
    // eslint-disable-next-line indent
  > {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === AVAILABLE_DEVELOPMENT_SLOT
        )
      )
    );
  }

  getDomainSelectedDevelopmentCards(): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) =>
            domainCard?.cardType === DEVELOPMENT_CARD_INTERFACE_NAME
        )
      )
    );
  }

  useActionCardDisabled(): Observable<boolean> {
    return this.game.phase$.pipe(
      map((phase) => {
        return phase !== GamePhase.LoopActions;
      })
    );
  }

  useActionCard(): void {
    this.gameRules.useActionCard();
  }

  getSelectedActionCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$.pipe(
      filter((handCard) => handCard?.cardType === ACTION_CARD_INTERFACE_NAME)
    );
  }

  putLand(): void {
    this.gameRules.putLandsPileCardInSlot();
  }

  giveLockedResources(): void {
    this.domainsCards.giveLockedResources();
  }

  getPileSelectedLandCard(): Observable<LandsPileCardsEntity | undefined> {
    return this.landsPileCards.selectedLandsPileCards$;
  }

  getSelectedHandCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$;
  }

  getSelectedAvailableLandSlots(): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === AVAILABLE_LAND_SLOT
        )
      )
    );
  }

  getDomainSelectedLandCards(): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === LAND_CARD_INTERFACE_NAME
        )
      )
    );
  }

  clearDomainCardSelection(): void {
    this.domainsCards.clearDomainCardSelection();
  }

  swapSelectedDomainsCards(): void {
    this.domainsCards.swapSelectedCards();
  }
}
