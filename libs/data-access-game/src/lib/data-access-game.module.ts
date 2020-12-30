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
import * as fromDiscardPile from './+state/discard-pile/discard-pile.reducer';
import { DiscardPileEffects } from './+state/discard-pile/discard-pile.effects';
import { DiscardPileFacade } from './+state/discard-pile/discard-pile.facade';
import * as fromEventsPile from './+state/events-pile/events-pile.reducer';
import { EventsPileEffects } from './+state/events-pile/events-pile.effects';
import { EventsPileFacade } from './+state/events-pile/events-pile.facade';
import * as fromStockPiles from './+state/stock-piles/stock-piles.reducer';
import { StockPilesEffects } from './+state/stock-piles/stock-piles.effects';
import { StockPilesFacade } from './+state/stock-piles/stock-piles.facade';
import * as fromLandsPile from './+state/lands-pile/lands-pile.reducer';
import { LandsPileEffects } from './+state/lands-pile/lands-pile.effects';
import { LandsPileFacade } from './+state/lands-pile/lands-pile.facade';
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
      fromDiscardPile.DISCARD_PILE_FEATURE_KEY,
      fromDiscardPile.discardPileReducer
    ),
    EffectsModule.forFeature([DiscardPileEffects]),
    StoreModule.forFeature(
      fromEventsPile.EVENTS_PILE_FEATURE_KEY,
      fromEventsPile.eventsPileReducer
    ),
    EffectsModule.forFeature([EventsPileEffects]),
    StoreModule.forFeature(
      fromStockPiles.STOCK_PILES_FEATURE_KEY,
      fromStockPiles.stockPilesReducer
    ),
    EffectsModule.forFeature([StockPilesEffects]),
    StoreModule.forFeature(
      fromLandsPile.LANDS_PILE_FEATURE_KEY,
      fromLandsPile.landsPileReducer
    ),
    EffectsModule.forFeature([LandsPileEffects]),
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
  ],
  providers: [
    DomainsFacade,
    HandsFacade,
    DiceFacade,
    DiscardPileFacade,
    EventsPileFacade,
    StockPilesFacade,
    LandsPileFacade,
    FaceUpPilesFacade,
    DomainCardsFacade,
    HandCardsFacade,
    StockPileCardsFacade,
  ],
})
export class DataAccessGameModule {}
