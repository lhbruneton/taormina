import { Injectable } from '@angular/core';
import {
  DomainsCardsFacade,
  EventsPileCardsFacade,
  FaceUpPilesCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameRulesService {
  constructor(
    private game: GameFacade,
    private domainsCards: DomainsCardsFacade,
    private handsCards: HandsCardsFacade,
    private faceUpPilesCards: FaceUpPilesCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private eventsPileCards: EventsPileCardsFacade
  ) {}

  initNewGame(): void {
    this.game.initNewGame();
    this.domainsCards.initNewGame();
    this.handsCards.initNewGame();
    this.faceUpPilesCards.initNewGame();
    this.landsPileCards.initNewGame();
    this.stockPilesCards.initNewGame();
    this.eventsPileCards.initNewGame();
  }

  drawFromStockToHand(
    pileId: string,
    cardsCount: number,
    handId: string
  ): void {
    this.stockPilesCards.allStockPilesCards$
      .pipe(
        take(1),
        map((stockPilesCards) => {
          return stockPilesCards
            .filter((stockPileCard) => stockPileCard.pileId === pileId)
            .slice(0, cardsCount)
            .map((stockPileCard) => {
              return {
                type: stockPileCard.cardType,
                id: stockPileCard.cardId,
              };
            });
        })
      )
      .subscribe((cards) => {
        this.stockPilesCards.removeCardsFromStockPile(pileId, cards);
        this.handsCards.addCardsToHand(handId, cards);
      });
  }

  useResourcesToPutFaceUpPileCardInSlot(): void {
    this.domainsCards.useLockedResources();

    combineLatest([
      this.faceUpPilesCards.selectedFaceUpPilesCards$,
      this.domainsCards.selectedDomainsCards$,
    ])
      .pipe(
        take(1),
        map(([faceUpPileCard, domainCard]) => {
          if (faceUpPileCard === undefined)
            throw new Error(`Can't put card in slot if no card selected.`);
          if (domainCard === undefined)
            throw new Error(`Can't put card in slot if no slot selected.`);

          return {
            faceUpPileCardId: faceUpPileCard.id,
            domainCardId: domainCard.id,
            cardType: AGGLOMERATION_CARD_INTERFACE_NAME as typeof AGGLOMERATION_CARD_INTERFACE_NAME,
            cardId: faceUpPileCard.cardId,
          };
        })
      )
      .subscribe(({ faceUpPileCardId, domainCardId, cardType, cardId }) => {
        this.faceUpPilesCards.removeFaceUpPileCard(faceUpPileCardId);
        this.domainsCards.putCardInSlot(domainCardId, cardType, cardId);
        this.domainsCards.unselectDomainCard();
      });
  }

  useResourcesToPutHandCardInSlot(): void {
    this.domainsCards.useLockedResources();

    combineLatest([
      this.handsCards.selectedHandsCards$,
      this.domainsCards.selectedDomainsCards$,
    ])
      .pipe(
        take(1),
        map(([handCard, domainCard]) => {
          if (handCard === undefined)
            throw new Error(`Can't put card in slot if no card selected.`);
          if (domainCard === undefined)
            throw new Error(`Can't put card in slot if no slot selected.`);

          return {
            handCardId: handCard.id,
            domainCardId: domainCard.id,
            cardType: DEVELOPMENT_CARD_INTERFACE_NAME as typeof DEVELOPMENT_CARD_INTERFACE_NAME,
            cardId: handCard.cardId,
          };
        })
      )
      .subscribe(({ handCardId, domainCardId, cardType, cardId }) => {
        this.handsCards.removeHandCard(handCardId);
        this.domainsCards.putCardInSlot(domainCardId, cardType, cardId);
        this.domainsCards.unselectDomainCard();
      });
  }
}
