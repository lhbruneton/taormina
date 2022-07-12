import { Component } from '@angular/core';
import {
  DiscardPileCardsEntity,
  DiscardPileCardsFacade,
  DomainsCardsFacade,
  EventsPileCardsEntity,
  EventsPileCardsFacade,
  AgglomerationPilesCardsFacade,
  GameFacade,
  LandsPileCardsEntity,
  LandsPileCardsFacade,
  StockPilesCardsEntity,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import {
  actionCards,
  developmentCards,
  eventCards,
  agglomerationPiles,
  ID_AGGLOMERATION_HAMLET,
  ID_AGGLOMERATION_ROAD,
  ID_AGGLOMERATION_TOWN,
  ID_HAND_BLUE,
  ID_HAND_RED,
  landCards,
  stockPiles,
} from '@taormina/shared-constants';
import {
  ActionCard,
  ActionName,
  ACTION_CARD_INTERFACE_NAME,
  DevelopmentCard,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  DomainColor,
  EventCard,
  GamePhase,
  LandCard,
} from '@taormina/shared-models';
import {
  mapDomainColorToDomainId,
  mapDomainColorToHandId,
} from '@taormina/shared-utils';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'taormina-piles',
  templateUrl: './piles.component.html',
  styleUrls: ['./piles.component.css'],
})
export class PilesComponent {
  ACTION_CARD_INTERFACE_NAME = ACTION_CARD_INTERFACE_NAME;
  DEVELOPMENT_CARD_INTERFACE_NAME = DEVELOPMENT_CARD_INTERFACE_NAME;

  selectedStockPileId: string | undefined;

  constructor(
    private game: GameFacade,
    private domainsCards: DomainsCardsFacade,
    private agglomerationPilesCards: AgglomerationPilesCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private eventsPileCards: EventsPileCardsFacade,
    private discardPileCards: DiscardPileCardsFacade,
    private gameRules: GameRulesService
  ) {}

  getAgglomerationPiles(): string[] {
    return agglomerationPiles;
  }

  selectFirst(pileId: string): void {
    this.agglomerationPilesCards.selectFirstCardFromAgglomerationPile(pileId);
  }

  getAgglomerationPileTypeIconName(pileId: string): string {
    switch (pileId) {
      case ID_AGGLOMERATION_ROAD:
        return 'path';
      case ID_AGGLOMERATION_HAMLET:
        return 'village';
      case ID_AGGLOMERATION_TOWN:
        return 'castle';
      default:
        throw new Error(`Can't get type icon name for pile with id ${pileId}.`);
    }
  }

  getAgglomerationPileRessources(
    pileId: string
  ): { iconName: string; count: number }[] {
    switch (pileId) {
      case ID_AGGLOMERATION_ROAD:
        return [
          { iconName: 'wood', count: 1 },
          { iconName: 'brick', count: 2 },
        ];
      case ID_AGGLOMERATION_HAMLET:
        return [
          { iconName: 'wood', count: 1 },
          { iconName: 'brick', count: 1 },
          { iconName: 'hay', count: 1 },
          { iconName: 'sheep', count: 1 },
        ];
      case ID_AGGLOMERATION_TOWN:
        return [
          { iconName: 'hay', count: 2 },
          { iconName: 'stone', count: 3 },
        ];
      default:
        throw new Error(`Can't get type icon name for pile with id ${pileId}.`);
    }
  }

  getAgglomerationPileCount(pileId: string): Observable<number> {
    switch (pileId) {
      case ID_AGGLOMERATION_ROAD:
        return this.agglomerationPilesCards.allRoadPivots$.pipe(
          map((pivots) => pivots.length)
        );
      case ID_AGGLOMERATION_HAMLET:
        return this.agglomerationPilesCards.allHamletPivots$.pipe(
          map((pivots) => pivots.length)
        );
      case ID_AGGLOMERATION_TOWN:
        return this.agglomerationPilesCards.allTownPivots$.pipe(
          map((pivots) => pivots.length)
        );
      default:
        throw new Error(`Can't get count for pile with id ${pileId}.`);
    }
  }

  getLandCard(cardId: string): LandCard | undefined {
    return landCards.get(cardId);
  }

  getLandsPileCards(): Observable<LandsPileCardsEntity[]> {
    return this.landsPileCards.allLandsPileCards$;
  }

  canSelectAnyLandCard(): Observable<boolean> {
    return this.game.action$.pipe(
      map((action) => action === ActionName.Pathfinder)
    );
  }

  selectLandsPileCard(pivotId: string): void {
    this.landsPileCards.selectLandsPileCard(pivotId);
  }

  getStockPiles(): string[] {
    return stockPiles;
  }

  getStockPilesCards(pileId: string): Observable<StockPilesCardsEntity[]> {
    return this.stockPilesCards.allStockPilesCards$.pipe(
      map((stockPilesCards) =>
        stockPilesCards.filter(
          (stockPileCard) => stockPileCard.pileId === pileId
        )
      )
    );
  }

  drawInitialRedHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Red;
      })
    );
  }

  drawInitialRedHand(pileId: string): void {
    const initialHandCount = 3;
    this.gameRules.drawFirstCardsFromStockToHand(
      pileId,
      initialHandCount,
      ID_HAND_RED
    );
  }

  drawFirstCardRedHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.LoopDraw && player === DomainColor.Red;
      })
    );
  }

  drawFirstCardRedHand(pileId: string): void {
    this.gameRules.drawFirstCardsFromStockToHand(pileId, 1, ID_HAND_RED);
  }

  drawInitialBlueHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Blue;
      })
    );
  }

  drawInitialBlueHand(pileId: string): void {
    const initialHandCount = 3;
    this.gameRules.drawFirstCardsFromStockToHand(
      pileId,
      initialHandCount,
      ID_HAND_BLUE
    );
  }

  drawFirstCardBlueHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.LoopDraw && player === DomainColor.Blue;
      })
    );
  }

  drawFirstCardBlueHand(pileId: string): void {
    this.gameRules.drawFirstCardsFromStockToHand(pileId, 1, ID_HAND_BLUE);
  }

  getActionCard(cardId: string): ActionCard | undefined {
    return actionCards.get(cardId);
  }

  getDevelopmentCard(cardId: string): DevelopmentCard | undefined {
    return developmentCards.get(cardId);
  }

  canDrawAnyCardInStockPile(pileId: string): Observable<boolean> {
    return this.game.player$.pipe(
      switchMap((domainColor) => {
        const domainId = mapDomainColorToDomainId(domainColor);
        return this.domainsCards.hasDomainCommunityCenter(domainId);
      }),
      map(
        (hasCommunityCenter) =>
          hasCommunityCenter && pileId === this.selectedStockPileId
      )
    );
  }

  drawCardCurrentPlayer(pileId: string, cardId: string): void {
    this.game.player$.pipe(take(1)).subscribe((domainColor) => {
      const handId = mapDomainColorToHandId(domainColor);
      this.gameRules.drawCardFromStockToHand(pileId, cardId, handId);
      this.unselectStockPile();
    });
  }

  putBackSelectedHandCardAvailable(): Observable<boolean> {
    return this.game.phase$.pipe(
      map((phase) => {
        return phase === GamePhase.LoopExchange;
      })
    );
  }

  putBackSelectedHandCard(pileId: string): void {
    this.gameRules.putBackFromHandToStockPile(pileId);
  }

  putBackSelectedDomainCard(pileId: string): void {
    this.gameRules.putBackFromDomainToStockPile(pileId);
  }

  canSelectStockPile(): Observable<boolean> {
    return this.game.player$.pipe(
      switchMap((domainColor) => {
        const domainId = mapDomainColorToDomainId(domainColor);
        return this.domainsCards.hasDomainCommunityCenter(domainId);
      })
    );
  }

  buySelectStockPile(pileId: string): void {
    this.domainsCards.useLockedResources();
    this.selectedStockPileId = pileId;
  }

  unselectStockPile(): void {
    this.selectedStockPileId = undefined;
  }

  getEventsPileCards(): Observable<EventsPileCardsEntity[]> {
    return this.eventsPileCards.allEventsPileCards$;
  }

  getEventCard(cardId: string): EventCard | undefined {
    return eventCards.get(cardId);
  }

  getDiscardPileCardsReverse(): Observable<DiscardPileCardsEntity[]> {
    return this.discardPileCards.allDiscardPileCardsReverse$;
  }
}
