import { Injectable } from '@angular/core';
import {
  DiscardPileCardsFacade,
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
  actionCards,
  eventCards,
  ID_FACE_UP_HAMLET,
  ID_FACE_UP_TOWN,
} from '@taormina/shared-constants';
import {
  ACTION_CARD_INTERFACE_NAME,
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
  MasteryPointsType,
  RowValue,
} from '@taormina/shared-models';
import { combineLatest, Observable, Subject } from 'rxjs';
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
    private eventsPileCards: EventsPileCardsFacade,
    private discardPileCards: DiscardPileCardsFacade
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
    this.discardPileCards.initNewGame();
  }

  getVictoryPointsForDomain(domainId: string): Observable<number> {
    return combineLatest([
      this.domainsCards.getCardsVictoryPointsForDomain(domainId),
      this.domainsCards.getMasteryDomainForType(MasteryPointsType.Trade),
      this.domainsCards.getMasteryDomainForType(MasteryPointsType.Strength),
    ]).pipe(
      map(
        ([
          cardsVictoryPoints,
          tradeMasteryDomainId,
          strengthMasteryDomainId,
        ]) => {
          return (
            cardsVictoryPoints +
            (tradeMasteryDomainId === domainId ? 1 : 0) +
            (strengthMasteryDomainId === domainId ? 1 : 0)
          );
        }
      )
    );
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
        map(([faceUpPileCard, domainCards]) => {
          if (faceUpPileCard === undefined) {
            throw new Error(`Can't put card in slot if no card selected.`);
          }
          if (domainCards.length !== 1) {
            throw new Error(
              `Can't put card in slot if no slot or more than one slot selected.`
            );
          }
          const domainCard = domainCards[0];
          if (domainCard === undefined) {
            throw new Error(
              `Something went wrong, domainCard shouldn't be undefined at this point.`
            );
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

          this.domainsCards.clearDomainCardSelection();
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
        map(([handCard, domainCards]) => {
          if (handCard === undefined) {
            throw new Error(`Can't put card in slot if no card selected.`);
          }
          if (domainCards.length !== 1) {
            throw new Error(
              `Can't put card in slot if no slot or more than one slot selected.`
            );
          }
          const domainCard = domainCards[0];
          if (domainCard === undefined) {
            throw new Error(
              `Something went wrong, domainCard shouldn't be undefined at this point.`
            );
          }

          this.handsCards.removeHandCard(handCard.id);
          this.domainsCards.putCardInSlot(
            domainCard.id,
            DEVELOPMENT_CARD_INTERFACE_NAME,
            handCard.cardId
          );
          this.domainsCards.clearDomainCardSelection();
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
        map(([landsPileCard, domainCards]) => {
          if (landsPileCard === undefined) {
            throw new Error(`Can't put card in slot if no card selected.`);
          }
          if (domainCards.length !== 1) {
            throw new Error(
              `Can't put card in slot if no slot or more than one slot selected.`
            );
          }
          const domainCard = domainCards[0];
          if (domainCard === undefined) {
            throw new Error(
              `Something went wrong, domainCard shouldn't be undefined at this point.`
            );
          }

          this.landsPileCards.removeLandsPileCard(landsPileCard.id);
          this.domainsCards.putCardInSlot(
            domainCard.id,
            LAND_CARD_INTERFACE_NAME,
            landsPileCard.cardId
          );
          this.domainsCards.clearDomainCardSelection();
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

  useActionCard(): void {
    this.handsCards.selectedHandsCards$
      .pipe(
        take(1),
        map((handCard) => {
          if (handCard === undefined) {
            throw new Error(`Can't put card in pile if no card selected.`);
          }
          if (
            handCard.cardType !== ACTION_CARD_INTERFACE_NAME ||
            handCard.cardId === undefined
          ) {
            throw new Error(`Can't use card other than action.`);
          }
          const action = actionCards.get(handCard.cardId);
          if (action === undefined) {
            throw new Error(
              `Something went wrong, action shouldn't be undefined at this point.`
            );
          }
          this.handsCards.removeHandCard(handCard.id);
          this.handsCards.unselectHandCard();
          this.game.setAction(action.name);
          this.discardPileCards.addCardToDiscardPile({
            type: handCard.cardType,
            id: handCard.cardId,
          });
        })
      )
      .subscribe();
  }
}
