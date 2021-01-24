import { Component } from '@angular/core';
import {
  CardsFacade,
  DiceFacade,
  DomainCardsFacade,
  DomainsFacade,
  EventsPileCardsFacade,
  LandsPileCardsFacade,
  StockPileCardsFacade,
  StockPilesFacade,
} from '@taormina/data-access-game';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'taormina-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private dice: DiceFacade,
    private cards: CardsFacade,
    private domains: DomainsFacade,
    private domainCards: DomainCardsFacade,
    private landCards: LandsPileCardsFacade,
    private eventCards: EventsPileCardsFacade,
    private stockPiles: StockPilesFacade,
    private stockPileCards: StockPileCardsFacade
  ) {}

  startNewGame() {
    this.dice.initNewGame();
    this.cards.initNewGame();
    this.domains.initNewGame();
    this.domainCards.initNewGame();
    this.landCards.initNewGame();
    this.eventCards.initNewGame();
    this.stockPiles.initNewGame();
    this.stockPileCards.initNewGame();
  }

  onThrow() {
    this.dice.throw();
  }

  getDice() {
    return this.dice.allDice$;
  }

  getTopDomain() {
    return this.domains.allDomains$.pipe(
      filter((domains) => domains.length > 0),
      map((domains) => domains[0])
    );
  }

  getBottomDomain() {
    return this.domains.allDomains$.pipe(
      filter((domains) => domains.length > 1),
      map((domains) => domains[1])
    );
  }

  getDomainCards(domainId: string) {
    return this.domainCards.allDomainCards$.pipe(
      map((cards) => cards.filter((card) => card.domainId === domainId))
    );
  }

  getCard(cardId: string) {
    return this.cards.getCardById(cardId);
  }

  getPrintableCard(cardId: string) {
    return this.cards.getPrintableCardById(cardId);
  }

  getLandCards() {
    return this.landCards.allLandsPileCards$;
  }

  getEventCards() {
    return this.eventCards.allEventsPileCards$;
  }

  getStockPiles() {
    return this.stockPiles.allStockPiles$;
  }

  getStockPileCards(stockPileId: string) {
    return this.stockPileCards.allStockPileCards$.pipe(
      map((cards) => cards.filter((card) => card.stockPileId === stockPileId))
    );
  }
}
