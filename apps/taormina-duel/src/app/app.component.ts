import { Component } from '@angular/core';
import {
  DomainsCardsEntity,
  DomainsCardsFacade,
  EventsPileCardsEntity,
  EventsPileCardsFacade,
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
  hands,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
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

  constructor(
    private game: GameFacade,
    private DomainsCards: DomainsCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private eventsPileCards: EventsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private handsCards: HandsCardsFacade,
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

  getRedDomain(): Domain | undefined {
    return domains.get(ID_DOMAIN_RED);
  }

  getBlueDomain(): Domain | undefined {
    return domains.get(ID_DOMAIN_BLUE);
  }

  getDomainsCards(domainId: string): Observable<DomainsCardsEntity[]> {
    return this.DomainsCards.allDomainsCards$.pipe(
      map((DomainsCards) =>
        DomainsCards.filter((domainCard) => domainCard.domainId === domainId)
      )
    );
  }

  getLandsPileCards(): Observable<LandsPileCardsEntity[]> {
    return this.landsPileCards.allLandsPileCards$;
  }

  getEventsPileCards(): Observable<EventsPileCardsEntity[]> {
    return this.eventsPileCards.allEventsPileCards$;
  }

  getEventCard(cardId: string): EventCard | undefined {
    return eventCards.get(cardId);
  }

  getStockPiles(): string[] {
    return stockPiles;
  }

  getStockPilesCards(stockPileId: string): Observable<StockPilesCardsEntity[]> {
    return this.stockPilesCards.allStockPilesCards$.pipe(
      map((stockPilesCards) =>
        stockPilesCards.filter(
          (stockPileCard) => stockPileCard.stockPileId === stockPileId
        )
      )
    );
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

  drawInitialRedHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Red;
      })
    );
  }

  drawInitialRedHand(stockPileId: string): void {
    this.gameRules.drawFromStockToHand(stockPileId, 3, ID_HAND_RED);
  }

  drawInitialBlueHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Blue;
      })
    );
  }

  drawInitialBlueHand(stockPileId: string): void {
    this.gameRules.drawFromStockToHand(stockPileId, 3, ID_HAND_BLUE);
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
}
