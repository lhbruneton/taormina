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
  AVAILABLE_DEVELOPMENT_SLOT,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { combineLatest } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

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
        tap(([faceUpPileCard, domainCard]) => {
          if (faceUpPileCard === undefined)
            throw new Error(`Can't put card in slot if no card selected.`);
          if (domainCard === undefined)
            throw new Error(`Can't put card in slot if no slot selected.`);

          this.faceUpPilesCards.removeFaceUpPileCard(faceUpPileCard.id);
          this.domainsCards.putCardInSlot(
            domainCard.id,
            AGGLOMERATION_CARD_INTERFACE_NAME,
            faceUpPileCard.cardId
          );
          this.domainsCards.createAvailableDomainCard(
            domainCard.domainId,
            AVAILABLE_DEVELOPMENT_SLOT,
            domainCard.col < 0 ? domainCard.col - 1 : domainCard.col + 1,
            0
          );
          this.domainsCards.unselectDomainCard();
        })
      )
      .subscribe();
  }

  useResourcesToPutHandCardInSlot(): void {
    this.domainsCards.useLockedResources();

    combineLatest([
      this.handsCards.selectedHandsCards$,
      this.domainsCards.selectedDomainsCards$,
    ])
      .pipe(
        take(1),
        tap(([handCard, domainCard]) => {
          if (handCard === undefined)
            throw new Error(`Can't put card in slot if no card selected.`);
          if (domainCard === undefined)
            throw new Error(`Can't put card in slot if no slot selected.`);

          this.handsCards.removeHandCard(handCard.id);
          this.domainsCards.putCardInSlot(
            domainCard.id,
            DEVELOPMENT_CARD_INTERFACE_NAME,
            handCard.cardId
          );
          this.domainsCards.unselectDomainCard();
        })
      )
      .subscribe();
  }
}
