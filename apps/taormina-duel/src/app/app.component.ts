import { Component } from '@angular/core';
import {
  DiscardPileCardsEntity,
  DiscardPileCardsFacade,
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
  ActionName,
  ACTION_CARD_INTERFACE_NAME,
  AgglomerationCard,
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
  AVAILABLE_DEVELOPMENT_SLOT,
  AVAILABLE_LAND_SLOT,
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
  MasteryPointsType,
  ResourceValue,
  RESOURCE_VALUES,
} from '@taormina/shared-models';
import {
  mapDomainColorToDomainId,
  mapDomainColorToHandId,
} from '@taormina/shared-utils';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';

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

  RESOURCE_VALUES = RESOURCE_VALUES;

  selectedStockPileId: string | undefined;

  constructor(
    private game: GameFacade,
    private domainsCards: DomainsCardsFacade,
    private handsCards: HandsCardsFacade,
    private faceUpPilesCards: FaceUpPilesCardsFacade,
    private landsPileCards: LandsPileCardsFacade,
    private stockPilesCards: StockPilesCardsFacade,
    private eventsPileCards: EventsPileCardsFacade,
    private discardPileCards: DiscardPileCardsFacade,
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

  getNextProductionDie(): Observable<ResourceValue | undefined> {
    return this.game.nextProductionDie$;
  }

  setNextProductionDie(value: ResourceValue): void {
    this.game.setNextProductionDie(value);
  }

  getSelectedEventsPileCard(): Observable<EventsPileCardsEntity | undefined> {
    return this.eventsPileCards.selectedEventsPileCards$;
  }

  removeSelectedEventsPileCard(): void {
    this.eventsPileCards.removeSelected();
  }

  getAction(): Observable<ActionName | undefined> {
    return this.game.action$;
  }

  unsetAction(): void {
    this.game.setAction(undefined);
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
    this.gameRules.throwDice();
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

  getVictoryPoints(domainId: string): Observable<number> {
    return this.gameRules.getVictoryPointsForDomain(domainId);
  }

  getStrengthMastery(domainId: string): Observable<boolean> {
    return this.domainsCards
      .getMasteryDomainForType(MasteryPointsType.Strength)
      .pipe(map((masteryDomainId) => domainId === masteryDomainId));
  }

  getTradeMastery(domainId: string): Observable<boolean> {
    return this.domainsCards
      .getMasteryDomainForType(MasteryPointsType.Trade)
      .pipe(map((masteryDomainId) => domainId === masteryDomainId));
  }

  getCelebrationPoints(domainId: string): Observable<number> {
    return this.domainsCards.getCelebrationPointsForDomain(domainId);
  }

  getShipsCount(domainId: string): Observable<number> {
    return this.domainsCards.getMerchantShipCountForDomain(domainId);
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

  getRowsTemplate(domainId: string): Observable<string> {
    return combineLatest([
      this.domainsCards.getDomainMinRow(domainId),
      this.domainsCards.getDomainMaxRow(domainId),
    ]).pipe(
      map(([min, max]) => {
        let template = '';
        for (let i = min; i < max + 1; i++) {
          template += `[row${i}] 150px `;
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

  isDomainCardSelected(pivotId: string): Observable<boolean> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainsCards) =>
        domainsCards.map((domainsCard) => domainsCard.id).includes(pivotId)
      )
    );
  }

  toggleDomainCardSelection(pivotId: string): void {
    this.domainsCards.toggleDomainCardSelection(pivotId);
  }

  clearDomainCardSelection(): void {
    this.domainsCards.clearDomainCardSelection();
  }

  swapSelectedDomainsCards(): void {
    this.domainsCards.swapSelectedCards();
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

  canSelectAnyLandCard(): Observable<boolean> {
    return this.game.action$.pipe(
      map((action) => action === ActionName.Pathfinder)
    );
  }

  selectLandsPileCard(pivotId: string): void {
    this.landsPileCards.selectLandsPileCard(pivotId);
  }

  canSelectStockPile(): Observable<boolean> {
    return this.game.player$.pipe(
      switchMap((domainColor) => {
        const domainId = mapDomainColorToDomainId(domainColor);
        return this.domainsCards.hasDomainCommunityCenter(domainId);
      })
    );
  }

  buySelectStockPile(pileId: string): void {
    this.domainsCards.useLockedResources();
    this.selectedStockPileId = pileId;
  }

  unselectStockPile(): void {
    this.selectedStockPileId = undefined;
  }

  canDrawAnyCardInStockPile(pileId: string): Observable<boolean> {
    return this.game.player$.pipe(
      switchMap((domainColor) => {
        const domainId = mapDomainColorToDomainId(domainColor);
        return this.domainsCards.hasDomainCommunityCenter(domainId);
      }),
      map(
        (hasCommunityCenter) =>
          hasCommunityCenter && pileId === this.selectedStockPileId
      )
    );
  }

  drawCardCurrentPlayer(pileId: string, cardId: string): void {
    this.game.player$.pipe(take(1)).subscribe((domainColor) => {
      const handId = mapDomainColorToHandId(domainColor);
      this.gameRules.drawCardFromStockToHand(pileId, cardId, handId);
      this.unselectStockPile();
    });
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

  getDiscardPileCardsReverse(): Observable<DiscardPileCardsEntity[]> {
    return this.discardPileCards.allDiscardPileCardsReverse$;
  }

  useActionCardDisabled(): Observable<boolean> {
    return this.game.phase$.pipe(
      map((phase) => {
        return phase !== GamePhase.LoopActions;
      })
    );
  }

  useActionCard(): void {
    this.gameRules.useActionCard();
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
    const initialHandCount = 3;
    this.gameRules.drawFirstCardsFromStockToHand(
      pileId,
      initialHandCount,
      ID_HAND_RED
    );
  }

  drawFirstCardRedHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.LoopDraw && player === DomainColor.Red;
      })
    );
  }

  drawFirstCardRedHand(pileId: string): void {
    this.gameRules.drawFirstCardsFromStockToHand(pileId, 1, ID_HAND_RED);
  }

  drawInitialBlueHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.InitialDraw && player === DomainColor.Blue;
      })
    );
  }

  drawInitialBlueHand(pileId: string): void {
    const initialHandCount = 3;
    this.gameRules.drawFirstCardsFromStockToHand(
      pileId,
      initialHandCount,
      ID_HAND_BLUE
    );
  }

  drawFirstCardBlueHandAvailable(): Observable<boolean> {
    return combineLatest([this.game.phase$, this.game.player$]).pipe(
      map(([phase, player]) => {
        return phase === GamePhase.LoopDraw && player === DomainColor.Blue;
      })
    );
  }

  drawFirstCardBlueHand(pileId: string): void {
    this.gameRules.drawFirstCardsFromStockToHand(pileId, 1, ID_HAND_BLUE);
  }

  putBackSelectedHandCardAvailable(): Observable<boolean> {
    return this.game.phase$.pipe(
      map((phase) => {
        return phase === GamePhase.LoopExchange;
      })
    );
  }

  putBackSelectedHandCard(pileId: string): void {
    this.gameRules.putBackFromHandToStockPile(pileId);
  }

  putBackSelectedDomainCard(pileId: string): void {
    this.gameRules.putBackFromDomainToStockPile(pileId);
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

  putLand(): void {
    this.gameRules.putLandsPileCardInSlot();
  }

  giveLockedResources(): void {
    this.domainsCards.giveLockedResources();
  }

  getSelectedFaceUpPileCard(): Observable<FaceUpPilesCardsEntity | undefined> {
    return this.faceUpPilesCards.selectedFaceUpPilesCards$;
  }

  getDomainSelectedAgglomerationSlots(): Observable<
    DomainsCardsEntity[]
    // eslint-disable-next-line indent
  > {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) =>
            domainCard?.cardType === AGGLOMERATION_CARD_INTERFACE_NAME
        )
      )
    );
  }

  getSelectedHandCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$;
  }

  getHandSelectedDevelopmentCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$.pipe(
      filter(
        (handCard) => handCard?.cardType === DEVELOPMENT_CARD_INTERFACE_NAME
      )
    );
  }

  getDomainSelectedDevelopmentCards(): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) =>
            domainCard?.cardType === DEVELOPMENT_CARD_INTERFACE_NAME
        )
      )
    );
  }

  getSelectedActionCard(): Observable<HandsCardsEntity | undefined> {
    return this.handsCards.selectedHandsCards$.pipe(
      filter((handCard) => handCard?.cardType === ACTION_CARD_INTERFACE_NAME)
    );
  }

  getPileSelectedLandCard(): Observable<LandsPileCardsEntity | undefined> {
    return this.landsPileCards.selectedLandsPileCards$;
  }

  getSelectedAvailableLandSlots(): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === AVAILABLE_LAND_SLOT
        )
      )
    );
  }

  getDomainSelectedLandCards(): Observable<DomainsCardsEntity[]> {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === LAND_CARD_INTERFACE_NAME
        )
      )
    );
  }

  getSelectedAvailableAgglomerationSlots(): Observable<
    DomainsCardsEntity[]
    // eslint-disable-next-line indent
  > {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === AVAILABLE_AGGLOMERATION_SLOT
        )
      )
    );
  }

  getSelectedAvailableDevelopmentSlots(): Observable<
    DomainsCardsEntity[]
    // eslint-disable-next-line indent
  > {
    return this.domainsCards.selectedDomainsCards$.pipe(
      map((domainCards) =>
        domainCards.filter(
          (domainCard) => domainCard?.cardType === AVAILABLE_DEVELOPMENT_SLOT
        )
      )
    );
  }
}
