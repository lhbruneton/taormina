import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDomains from './+state/domains/domains.reducer';
import { DomainsEffects } from './+state/domains/domains.effects';
import { DomainsFacade } from './+state/domains/domains.facade';
import * as fromHands from './+state/hands/hands.reducer';
import { HandsEffects } from './+state/hands/hands.effects';
import { HandsFacade } from './+state/hands/hands.facade';
import * as fromDice from './+state/dice/dice.reducer';
import { DiceEffects } from './+state/dice/dice.effects';
import { DiceFacade } from './+state/dice/dice.facade';
import * as fromStockPiles from './+state/stock-piles/stock-piles.reducer';
import { StockPilesEffects } from './+state/stock-piles/stock-piles.effects';
import { StockPilesFacade } from './+state/stock-piles/stock-piles.facade';
import * as fromFaceUpPiles from './+state/face-up-piles/face-up-piles.reducer';
import { FaceUpPilesEffects } from './+state/face-up-piles/face-up-piles.effects';
import { FaceUpPilesFacade } from './+state/face-up-piles/face-up-piles.facade';
import * as fromDomainCards from './+state/domain-cards/domain-cards.reducer';
import { DomainCardsEffects } from './+state/domain-cards/domain-cards.effects';
import { DomainCardsFacade } from './+state/domain-cards/domain-cards.facade';
import * as fromHandCards from './+state/hand-cards/hand-cards.reducer';
import { HandCardsEffects } from './+state/hand-cards/hand-cards.effects';
import { HandCardsFacade } from './+state/hand-cards/hand-cards.facade';
import * as fromStockPileCards from './+state/stock-pile-cards/stock-pile-cards.reducer';
import { StockPileCardsEffects } from './+state/stock-pile-cards/stock-pile-cards.effects';
import { StockPileCardsFacade } from './+state/stock-pile-cards/stock-pile-cards.facade';
import * as fromDiscardPileCards from './+state/discard-pile-cards/discard-pile-cards.reducer';
import { DiscardPileCardsEffects } from './+state/discard-pile-cards/discard-pile-cards.effects';
import { DiscardPileCardsFacade } from './+state/discard-pile-cards/discard-pile-cards.facade';
import * as fromEventsPileCards from './+state/events-pile-cards/events-pile-cards.reducer';
import { EventsPileCardsEffects } from './+state/events-pile-cards/events-pile-cards.effects';
import { EventsPileCardsFacade } from './+state/events-pile-cards/events-pile-cards.facade';
import * as fromLandsPileCards from './+state/lands-pile-cards/lands-pile-cards.reducer';
import { LandsPileCardsEffects } from './+state/lands-pile-cards/lands-pile-cards.effects';
import { LandsPileCardsFacade } from './+state/lands-pile-cards/lands-pile-cards.facade';
import * as fromCards from './+state/cards/cards.reducer';
import { CardsEffects } from './+state/cards/cards.effects';
import { CardsFacade } from './+state/cards/cards.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDomains.DOMAINS_FEATURE_KEY,
      fromDomains.domainsReducer
    ),
    EffectsModule.forFeature([DomainsEffects]),
    StoreModule.forFeature(fromHands.HANDS_FEATURE_KEY, fromHands.handsReducer),
    EffectsModule.forFeature([HandsEffects]),
    StoreModule.forFeature(fromDice.DICE_FEATURE_KEY, fromDice.diceReducer),
    EffectsModule.forFeature([DiceEffects]),
    StoreModule.forFeature(
      fromStockPiles.STOCK_PILES_FEATURE_KEY,
      fromStockPiles.stockPilesReducer
    ),
    EffectsModule.forFeature([StockPilesEffects]),
    StoreModule.forFeature(
      fromFaceUpPiles.FACE_UP_PILES_FEATURE_KEY,
      fromFaceUpPiles.faceUpPilesReducer
    ),
    EffectsModule.forFeature([FaceUpPilesEffects]),
    StoreModule.forFeature(
      fromDomainCards.DOMAIN_CARDS_FEATURE_KEY,
      fromDomainCards.domainCardsReducer
    ),
    EffectsModule.forFeature([DomainCardsEffects]),
    StoreModule.forFeature(
      fromHandCards.HAND_CARDS_FEATURE_KEY,
      fromHandCards.handCardsReducer
    ),
    EffectsModule.forFeature([HandCardsEffects]),
    StoreModule.forFeature(
      fromStockPileCards.STOCK_PILE_CARDS_FEATURE_KEY,
      fromStockPileCards.stockPileCardsReducer
    ),
    EffectsModule.forFeature([StockPileCardsEffects]),
    StoreModule.forFeature(
      fromDiscardPileCards.DISCARD_PILE_CARDS_FEATURE_KEY,
      fromDiscardPileCards.discardPileCardsReducer
    ),
    EffectsModule.forFeature([DiscardPileCardsEffects]),
    StoreModule.forFeature(
      fromEventsPileCards.EVENTS_PILE_CARDS_FEATURE_KEY,
      fromEventsPileCards.eventsPileCardsReducer
    ),
    EffectsModule.forFeature([EventsPileCardsEffects]),
    StoreModule.forFeature(
      fromLandsPileCards.LANDS_PILE_CARDS_FEATURE_KEY,
      fromLandsPileCards.landsPileCardsReducer
    ),
    EffectsModule.forFeature([LandsPileCardsEffects]),
    StoreModule.forFeature(fromCards.CARDS_FEATURE_KEY, fromCards.cardsReducer),
    EffectsModule.forFeature([CardsEffects]),
  ],
  providers: [
    DomainsFacade,
    HandsFacade,
    DiceFacade,
    StockPilesFacade,
    FaceUpPilesFacade,
    DomainCardsFacade,
    HandCardsFacade,
    StockPileCardsFacade,
    DiscardPileCardsFacade,
    EventsPileCardsFacade,
    LandsPileCardsFacade,
    CardsFacade,
  ],
})
export class DataAccessGameModule {}
