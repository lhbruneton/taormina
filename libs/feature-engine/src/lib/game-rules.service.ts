import { Injectable } from '@angular/core';
import {
  DomainsCardsFacade,
  EventsPileCardsEntity,
  EventsPileCardsFacade,
  FaceUpPilesCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import {
  eventCards,
  ID_FACE_UP_HAMLET,
  ID_FACE_UP_TOWN,
} from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  DiceValue,
  EventName,
  EventValue,
  GamePhase,
  LAND_CARD_INTERFACE_NAME,
  RowValue,
} from '@taormina/shared-models';
import { combineLatest, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameRulesService {
  gameEnded$ = new Subject();

  event$ = this.game.eventDie$.pipe(filter((die) => die === EventValue.Event));

  thieves$ = this.game.eventDie$.pipe(
    filter((die) => die === EventValue.Thieves)
  );

  countAndSteal$ = this.thieves$.pipe(
    takeUntil(this.gameEnded$),
    map(() => {
      this.domainsCards.countAndStealUnprotectedGoldAndWool();
    })
  );

  selectFirstEvent$ = this.event$.pipe(
    takeUntil(this.gameEnded$),
    map(() => {
      this.eventsPileCards.selectFirst();
    })
  );

  auspiciousYear$ = this.eventsPileCards.selectedEventsPileCards$.pipe(
    filter((pivot): pivot is EventsPileCardsEntity => pivot !== undefined),
    filter(
      (pivot) => eventCards.get(pivot.cardId)?.name === EventName.AuspiciousYear
    )
  );

  festival$ = this.eventsPileCards.selectedEventsPileCards$.pipe(
    filter((pivot): pivot is EventsPileCardsEntity => pivot !== undefined),
    filter((pivot) => eventCards.get(pivot.cardId)?.name === EventName.Festival)
  );

  increaseResourcesForDie$ = this.game.productionDie$.pipe(
    takeUntil(this.gameEnded$),
    filter((value): value is DiceValue => value !== undefined),
    map((value) => this.domainsCards.increaseResourcesForDie(value))
  );

  increaseResourcesForAuspiciousYear$ = this.auspiciousYear$.pipe(
    takeUntil(this.gameEnded$),
    map(() => this.domainsCards.increaseResourcesForAuspiciousYear())
  );

  resetEventsPileOnFestival$ = this.festival$.pipe(
    takeUntil(this.gameEnded$),
    map(() => this.eventsPileCards.resetEventsPile())
  );

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
    this.gameEnded$.next();
    this.countAndSteal$.subscribe();
    this.selectFirstEvent$.subscribe();
    this.increaseResourcesForDie$.subscribe();
    this.increaseResourcesForAuspiciousYear$.subscribe();
    this.resetEventsPileOnFestival$.subscribe();

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
        this.stockPilesCards.removeCardsFromStockPileTop(pileId, cards);
        this.handsCards.addCardsToHand(handId, cards);
      });
  }

  throwDice(): void {
    this.game.throwEventDie();
    this.game.phase$.pipe(take(1)).subscribe((phase) => {
      if (phase !== GamePhase.InitialThrow) {
        this.game.throwProductionDie();
      }
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
          if (faceUpPileCard === undefined) {
            throw new Error(`Can't put card in slot if no card selected.`);
          }
          if (domainCard === undefined) {
            throw new Error(`Can't put card in slot if no slot selected.`);
          }

          this.faceUpPilesCards.removeFaceUpPileCard(faceUpPileCard.id);
          this.domainsCards.putCardInSlot(
            domainCard.id,
            AGGLOMERATION_CARD_INTERFACE_NAME,
            faceUpPileCard.cardId
          );

          if (faceUpPileCard.pileId === ID_FACE_UP_TOWN) {
            this.domainsCards.createAvailableDomainCard(
              domainCard.domainId,
              AVAILABLE_DEVELOPMENT_SLOT,
              domainCard.col,
              RowValue.Lower
            );
            this.domainsCards.createAvailableDomainCard(
              domainCard.domainId,
              AVAILABLE_DEVELOPMENT_SLOT,
              domainCard.col,
              RowValue.Upper
            );
          } else {
            const availableCol =
              domainCard.col < 0 ? domainCard.col - 1 : domainCard.col + 1;
            this.domainsCards.createAvailableDomainCard(
              domainCard.domainId,
              AVAILABLE_AGGLOMERATION_SLOT,
              availableCol,
              RowValue.Middle
            );
            if (faceUpPileCard.pileId === ID_FACE_UP_HAMLET) {
              this.domainsCards.createAvailableDomainCard(
                domainCard.domainId,
                AVAILABLE_LAND_SLOT,
                availableCol,
                RowValue.Low
              );
              this.domainsCards.createAvailableDomainCard(
                domainCard.domainId,
                AVAILABLE_LAND_SLOT,
                availableCol,
                RowValue.Up
              );
            }
          }

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
        map(([handCard, domainCard]) => {
          if (handCard === undefined) {
            throw new Error(`Can't put card in slot if no card selected.`);
          }
          if (domainCard === undefined) {
            throw new Error(`Can't put card in slot if no slot selected.`);
          }

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

  putLandsPileCardInSlot(): void {
    combineLatest([
      this.landsPileCards.selectedLandsPileCards$,
      this.domainsCards.selectedDomainsCards$,
    ])
      .pipe(
        take(1),
        map(([landsPileCard, domainCard]) => {
          if (landsPileCard === undefined) {
            throw new Error(`Can't put card in slot if no card selected.`);
          }
          if (domainCard === undefined) {
            throw new Error(`Can't put card in slot if no slot selected.`);
          }

          this.landsPileCards.removeLandsPileCard(landsPileCard.id);
          this.domainsCards.putCardInSlot(
            domainCard.id,
            LAND_CARD_INTERFACE_NAME,
            landsPileCard.cardId
          );
          this.domainsCards.unselectDomainCard();
        })
      )
      .subscribe();
  }

  putBackFromHandToStockPile(pileId: string): void {
    this.handsCards.selectedHandsCards$
      .pipe(
        take(1),
        map((handCard) => {
          if (handCard === undefined) {
            throw new Error(`Can't put card in pile if no card selected.`);
          }
          this.handsCards.removeHandCard(handCard.id);
          this.handsCards.unselectHandCard();
          this.stockPilesCards.addCardsToStockPileBottom(pileId, [
            {
              type: handCard.cardType,
              id: handCard.cardId,
            },
          ]);
        })
      )
      .subscribe();
  }
}
