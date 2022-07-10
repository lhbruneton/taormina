import { Component } from '@angular/core';
import {
  DiscardPileCardsEntity,
  DiscardPileCardsFacade,
  DomainsCardsFacade,
  EventsPileCardsEntity,
  EventsPileCardsFacade,
  FaceUpPilesCardsFacade,
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
  faceUpPiles,
  ID_FACE_UP_HAMLET,
  ID_FACE_UP_ROAD,
  ID_FACE_UP_TOWN,
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
    private faceUpPilesCards: FaceUpPilesCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private eventsPileCards: EventsPileCardsFacade,
    private discardPileCards: DiscardPileCardsFacade,
    private gameRules: GameRulesService
  ) {}

  getFaceUpPiles(): string[] {
    return faceUpPiles;
  }

  selectFirst(pileId: string): void {
    this.faceUpPilesCards.selectFirstCardFromFaceUpPile(pileId);
  }

  getFaceUpPileCount(pileId: string): Observable<number> {
    switch (pileId) {
      case ID_FACE_UP_ROAD:
        return this.faceUpPilesCards.allRoadPivots$.pipe(
          map((pivots) => pivots.length)
        );
      case ID_FACE_UP_HAMLET:
        return this.faceUpPilesCards.allHamletPivots$.pipe(
          map((pivots) => pivots.length)
        );
      case ID_FACE_UP_TOWN:
        return this.faceUpPilesCards.allTownPivots$.pipe(
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