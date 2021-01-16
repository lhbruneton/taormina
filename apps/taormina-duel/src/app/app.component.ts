import { Component } from '@angular/core';
import {
  CardsFacade,
  DomainCardsFacade,
  DomainsFacade,
} from '@taormina/data-access-game';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'taormina-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private cards: CardsFacade,
    private domains: DomainsFacade,
    private domainCards: DomainCardsFacade
  ) {}

  startNewGame() {
    this.cards.initNewGame();
    this.domains.initNewGame();
    this.domainCards.initNewGame();
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
}
