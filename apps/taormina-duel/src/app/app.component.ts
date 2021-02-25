import { Component } from '@angular/core';
import {
  DomainsCardsFacade,
  EventsPileCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
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
  ACTION_CARD_INTERFACE_NAME,
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  DomainColor,
  GamePhase,
  LAND_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { combineLatest } from 'rxjs';
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

  startNewGame() {
    this.gameRules.initNewGame();
  }

  getPhase() {
    return this.game.phase$;
  }

  setPhase(phase: GamePhase) {
    this.game.setPhase(phase);
  }

  getPlayer() {
    return this.game.player$;
  }

  setPlayer(player: DomainColor) {
    this.game.setPlayer(player);
  }

  throwDisabled() {
    return this.game.phase$.pipe(
      map(
        (phase) =>
          phase !== GamePhase.InitialThrow && phase !== GamePhase.LoopThrow
      )
    );
  }

  onThrow() {
    this.game.throwDice();
  }

  getProductionDie() {
    return this.game.productionDie$;
  }

  getEventDie() {
    return this.game.eventDie$;
  }

  getRedDomain() {
    return domains.get(ID_DOMAIN_RED);
  }

  getBlueDomain() {
    return domains.get(ID_DOMAIN_BLUE);
  }

  getDomainsCards(domainId: string) {
    return this.DomainsCards.allDomainsCards$.pipe(
      map((DomainsCards) =>
        DomainsCards.filter((domainCard) => domainCard.domainId === domainId)
      )
    );
  }

  getLandsPileCards() {
    return this.landsPileCards.allLandsPileCards$;
  }

  getEventsPileCards() {
    return this.eventsPileCards.allEventsPileCards$;
  }

  getEventCard(cardId: string) {
    return eventCards.get(cardId);
  }

  getStockPiles() {
    return stockPiles;
  }

  getStockPilesCards(stockPileId: string) {
    return this.stockPilesCards.allStockPilesCards$.pipe(
      map((stockPilesCards) =>
        stockPilesCards.filter(
          (stockPileCard) => stockPileCard.stockPileId === stockPileId
        )
      )
    );
  }

  getRedHand() {
    return hands.get(ID_HAND_RED);
  }

  getBlueHand() {
    return hands.get(ID_HAND_BLUE);
  }

  getHandsCards(handId: string) {
    return this.handsCards.allHandsCards$.pipe(
      map((handsCards) =>
        handsCards.filter((handCard) => handCard.handId === handId)
      )
    );
  }

  drawInitialRedHandAvailable() {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Red;
      })
    );
  }

  drawInitialRedHand(stockPileId: string) {
    this.gameRules.drawFromStockToHand(stockPileId, 3, ID_HAND_RED);
  }

  drawInitialBlueHandAvailable() {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Blue;
      })
    );
  }

  drawInitialBlueHand(stockPileId: string) {
    this.gameRules.drawFromStockToHand(stockPileId, 3, ID_HAND_BLUE);
  }

  getActionCard(cardId: string) {
    return actionCards.get(cardId);
  }

  getAgglomerationCard(cardId: string) {
    return agglomerationCards.get(cardId);
  }

  getDevelopmentCard(cardId: string) {
    return developmentCards.get(cardId);
  }

  getLandCard(cardId: string) {
    return landCards.get(cardId);
  }
}
