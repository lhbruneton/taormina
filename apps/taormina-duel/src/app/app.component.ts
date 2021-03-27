import { Component } from '@angular/core';
import {
  DomainsCardsEntity,
  DomainsCardsFacade,
  EventsPileCardsEntity,
  EventsPileCardsFacade,
  FaceUpPilesCardsEntity,
  FaceUpPilesCardsFacade,
  GameFacade,
  HandsCardsEntity,
  HandsCardsFacade,
  LandsPileCardsEntity,
  LandsPileCardsFacade,
  StockPilesCardsEntity,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import {
  actionCards,
  agglomerationCards,
  developmentCards,
  domains,
  eventCards,
  faceUpPiles,
  hands,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
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
  ACTION_CARD_INTERFACE_NAME,
  AgglomerationCard,
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
  AVAILABLE_AGGLOMERATION_SLOT,
  DevelopmentCard,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  Domain,
  DomainColor,
  EventCard,
  EventValue,
  GamePhase,
  Hand,
  LandCard,
  LAND_CARD_INTERFACE_NAME,
  ResourceValue,
} from '@taormina/shared-models';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'taormina-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  GamePhase = GamePhase;
  DomainColor = DomainColor;

  ACTION_CARD_INTERFACE_NAME = ACTION_CARD_INTERFACE_NAME;
  AGGLOMERATION_CARD_INTERFACE_NAME = AGGLOMERATION_CARD_INTERFACE_NAME;
  DEVELOPMENT_CARD_INTERFACE_NAME = DEVELOPMENT_CARD_INTERFACE_NAME;
  LAND_CARD_INTERFACE_NAME = LAND_CARD_INTERFACE_NAME;
  AVAILABLE_AGGLOMERATION_SLOT = AVAILABLE_AGGLOMERATION_SLOT;
  AVAILABLE_DEVELOPMENT_SLOT = AVAILABLE_DEVELOPMENT_SLOT;
  AVAILABLE_LAND_SLOT = AVAILABLE_LAND_SLOT;

  constructor(
    private game: GameFacade,
    private domainsCards: DomainsCardsFacade,
    private handsCards: HandsCardsFacade,
    private faceUpPilesCards: FaceUpPilesCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private eventsPileCards: EventsPileCardsFacade,
    private gameRules: GameRulesService
  ) {}

  startNewGame(): void {
    this.gameRules.initNewGame();
  }

  getPhase(): Observable<GamePhase> {
    return this.game.phase$;
  }

  setPhase(phase: GamePhase): void {
    this.game.setPhase(phase);
  }

  getPlayer(): Observable<DomainColor> {
    return this.game.player$;
  }

  setPlayer(player: DomainColor): void {
    this.game.setPlayer(player);
  }

  throwDisabled(): Observable<boolean> {
    return this.game.phase$.pipe(
      map(
        (phase) =>
          phase !== GamePhase.InitialThrow && phase !== GamePhase.LoopThrow
      )
    );
  }

  onThrow(): void {
    this.game.throwDice();
  }

  getProductionDie(): Observable<ResourceValue | undefined> {
    return this.game.productionDie$;
  }

  getEventDie(): Observable<EventValue | undefined> {
    return this.game.eventDie$;
  }

  buyDisabled(): Observable<boolean> {
    return this.game.phase$.pipe(
      map((phase) => phase !== GamePhase.LoopActions)
    );
  }

  getRedDomain(): Domain | undefined {
    return domains.get(ID_DOMAIN_RED);
  }

  getBlueDomain(): Domain | undefined {
    return domains.get(ID_DOMAIN_BLUE);
  }

  getColumnsTemplate(domainId: string): Observable<string> {
    return combineLatest([
      this.domainsCards.getDomainMinCol(domainId),
      this.domainsCards.getDomainMaxCol(domainId),
    ]).pipe(
      map(([min, max]) => {
        let template = '';
        for (let i = min; i < max + 1; i++) {
          template += `[col${i}] 150px `;
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

  selectDomainCard(pivotId: string): void {
    this.domainsCards.selectDomainCard(pivotId);
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

  buyDomainCard(pivot: DomainsCardsEntity): void {
    console.log(pivot);
  }

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

  getLandsPileCards(): Observable<LandsPileCardsEntity[]> {
    return this.landsPileCards.allLandsPileCards$;
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

  getEventsPileCards(): Observable<EventsPileCardsEntity[]> {
    return this.eventsPileCards.allEventsPileCards$;
  }

  getEventCard(cardId: string): EventCard | undefined {
    return eventCards.get(cardId);
  }

  getRedHand(): Hand | undefined {
    return hands.get(ID_HAND_RED);
  }

  getBlueHand(): Hand | undefined {
    return hands.get(ID_HAND_BLUE);
  }

  getHandsCards(handId: string): Observable<HandsCardsEntity[]> {
    return this.handsCards.allHandsCards$.pipe(
      map((handsCards) =>
        handsCards.filter((handCard) => handCard.handId === handId)
      )
    );
  }

  selectHandCard(pivotId: string): void {
    this.handsCards.selectHandCard(pivotId);
  }

  drawInitialRedHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Red;
      })
    );
  }

  drawInitialRedHand(pileId: string): void {
    this.gameRules.drawFromStockToHand(pileId, 3, ID_HAND_RED);
  }

  drawInitialBlueHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Blue;
      })
    );
  }

  drawInitialBlueHand(pileId: string): void {
    this.gameRules.drawFromStockToHand(pileId, 3, ID_HAND_BLUE);
  }

  getActionCard(cardId: string): ActionCard | undefined {
    return actionCards.get(cardId);
  }

  getAgglomerationCard(cardId: string): AgglomerationCard | undefined {
    return agglomerationCards.get(cardId);
  }

  getDevelopmentCard(cardId: string): DevelopmentCard | undefined {
    return developmentCards.get(cardId);
  }

  getLandCard(cardId: string): LandCard | undefined {
    return landCards.get(cardId);
  }

  buyAgglomeration(): void {
    this.gameRules.useResourcesToPutFaceUpPileCardInSlot();
  }

  buyDevelopment(): void {
    this.gameRules.useResourcesToPutHandCardInSlot();
  }

  getSelectedFaceUpPileCard(): Observable<FaceUpPilesCardsEntity | undefined> {
    return this.faceUpPilesCards.selectedFaceUpPilesCards$;
  }

  getSelectedHandCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$;
  }

  getSelectedDomainCard(): Observable<DomainsCardsEntity | undefined> {
    return this.domainsCards.selectedDomainsCards$;
  }
}
