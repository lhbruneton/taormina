import { Component, Input } from '@angular/core';
import {
  DomainsCardsEntity,
  DomainsCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import {
  agglomerationCards,
  developmentCards,
  domains,
  landCards,
} from '@taormina/shared-constants';
import {
  AgglomerationCard,
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
  DevelopmentCard,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  Domain,
  LandCard,
  LAND_CARD_INTERFACE_NAME,
  MasteryPointsType,
} from '@taormina/shared-models';
import {
  mapDieToIconNameFront,
  mapTypeToIconNameFront,
} from '@taormina/shared-utils';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'taormina-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'],
})
export class DomainComponent {
  @Input() domainId!: string;

  DEVELOPMENT_CARD_INTERFACE_NAME = DEVELOPMENT_CARD_INTERFACE_NAME;
  AGGLOMERATION_CARD_INTERFACE_NAME = AGGLOMERATION_CARD_INTERFACE_NAME;
  LAND_CARD_INTERFACE_NAME = LAND_CARD_INTERFACE_NAME;
  AVAILABLE_AGGLOMERATION_SLOT = AVAILABLE_AGGLOMERATION_SLOT;
  AVAILABLE_DEVELOPMENT_SLOT = AVAILABLE_DEVELOPMENT_SLOT;
  AVAILABLE_LAND_SLOT = AVAILABLE_LAND_SLOT;

  mapTypeToIconNameFront = mapTypeToIconNameFront;
  mapDieToIconNameFront = mapDieToIconNameFront;

  constructor(
    private domainsCards: DomainsCardsFacade,
    private gameRules: GameRulesService
  ) {}

  getDomain(): Domain | undefined {
    return domains.get(this.domainId);
  }

  getShipsCount(domainId: string): Observable<number> {
    return this.domainsCards.getMerchantShipCountForDomain(domainId);
  }

  getCelebrationPoints(domainId: string): Observable<number> {
    return this.domainsCards.getCelebrationPointsForDomain(domainId);
  }

  getStrengthMastery(domainId: string): Observable<boolean> {
    return this.domainsCards
      .getMasteryDomainForType(MasteryPointsType.Strength)
      .pipe(map((masteryDomainId) => domainId === masteryDomainId));
  }

  getTradeMastery(domainId: string): Observable<boolean> {
    return this.domainsCards
      .getMasteryDomainForType(MasteryPointsType.Trade)
      .pipe(map((masteryDomainId) => domainId === masteryDomainId));
  }

  getVictoryPoints(domainId: string): Observable<number> {
    return this.gameRules.getVictoryPointsForDomain(domainId);
  }

  getColumnsTemplate(domainId: string): Observable<string> {
    return combineLatest([
      this.domainsCards.getDomainMinCol(domainId),
      this.domainsCards.getDomainMaxCol(domainId),
    ]).pipe(
      map(([min, max]) => {
        let template = '';
        for (let i = min; i < max + 1; i++) {
          template += `[col${i}] 25rem `;
        }
        return template;
      })
    );
  }

  getRowsTemplate(domainId: string): Observable<string> {
    return combineLatest([
      this.domainsCards.getDomainMinRow(domainId),
      this.domainsCards.getDomainMaxRow(domainId),
    ]).pipe(
      map(([min, max]) => {
        let template = '';
        for (let i = min; i < max + 1; i++) {
          template += `[row${i}] 25rem `;
        }
        return template;
      })
    );
  }

  getDomainsCards(domainId: string): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.allDomainsCards$.pipe(
      map((domainsCards) =>
        domainsCards.filter((domainCard) => domainCard.domainId === domainId)
      )
    );
  }

  getDevelopmentCard(cardId: string): DevelopmentCard | undefined {
    return developmentCards.get(cardId);
  }

  getAgglomerationCard(cardId: string): AgglomerationCard | undefined {
    return agglomerationCards.get(cardId);
  }

  getLandCard(cardId: string): LandCard | undefined {
    return landCards.get(cardId);
  }

  isDomainCardSelected(pivotId: string): Observable<boolean> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainsCards) =>
        domainsCards.map((domainsCard) => domainsCard.id).includes(pivotId)
      )
    );
  }

  toggleDomainCardSelection(pivotId: string): void {
    this.domainsCards.toggleDomainCardSelection(pivotId);
  }

  lockResource(pivotId: string): void {
    this.domainsCards.lockResource(pivotId);
  }

  unlockResources(pivotId: string): void {
    this.domainsCards.unlockResources(pivotId);
  }

  increaseResources(pivotId: string): void {
    this.domainsCards.increaseResources(pivotId);
  }
}
