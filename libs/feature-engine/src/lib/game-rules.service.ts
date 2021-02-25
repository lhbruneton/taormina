import { Injectable } from '@angular/core';
import {
  DomainsCardsFacade,
  EventsPileCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameRulesService {
  constructor(
    private game: GameFacade,
    private DomainsCards: DomainsCardsFacade,
    private landCards: LandsPileCardsFacade,
    private eventCards: EventsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private handsCards: HandsCardsFacade
  ) {}

  initNewGame() {
    this.game.initNewGame();
    this.DomainsCards.initNewGame();
    this.landCards.initNewGame();
    this.eventCards.initNewGame();
    this.stockPilesCards.initNewGame();
    this.handsCards.initNewGame();
  }

  drawFromStockToHand(stockPileId: string, cardsCount: number, handId: string) {
    this.stockPilesCards.allStockPilesCards$
      .pipe(
        take(1),
        map((stockPilesCards) => {
          return {
            stockPileId: stockPileId,
            cards: stockPilesCards
              .filter(
                (stockPileCard) => stockPileCard.stockPileId === stockPileId
              )
              .slice(0, cardsCount)
              .map((stockPileCard) => {
                return {
                  type: stockPileCard.cardType,
                  id: stockPileCard.cardId,
                };
              }),
            handId: handId,
          };
        })
      )
      .subscribe(({ stockPileId, cards, handId }) => {
        this.stockPilesCards.removeCardsFromStockPile(stockPileId, cards);
        this.handsCards.addCardsToHand(handId, cards);
      });
  }
}
