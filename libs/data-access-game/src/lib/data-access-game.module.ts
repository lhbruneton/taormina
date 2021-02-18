import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DiceEffects } from './+state/dice/dice.effects';
import { DiceFacade } from './+state/dice/dice.facade';
import * as fromDice from './+state/dice/dice.reducer';
import { DiscardPileCardsEffects } from './+state/discard-pile-cards/discard-pile-cards.effects';
import { DiscardPileCardsFacade } from './+state/discard-pile-cards/discard-pile-cards.facade';
import * as fromDiscardPileCards from './+state/discard-pile-cards/discard-pile-cards.reducer';
import { DomainsCardsEffects } from './+state/domains-cards/domains-cards.effects';
import { DomainsCardsFacade } from './+state/domains-cards/domains-cards.facade';
import * as fromDomainsCards from './+state/domains-cards/domains-cards.reducer';
import { EventsPileCardsEffects } from './+state/events-pile-cards/events-pile-cards.effects';
import { EventsPileCardsFacade } from './+state/events-pile-cards/events-pile-cards.facade';
import * as fromEventsPileCards from './+state/events-pile-cards/events-pile-cards.reducer';
import { FaceUpPilesCardsEffects } from './+state/face-up-piles-cards/face-up-piles-cards.effects';
import { FaceUpPilesCardsFacade } from './+state/face-up-piles-cards/face-up-piles-cards.facade';
import * as fromFaceUpPilesCards from './+state/face-up-piles-cards/face-up-piles-cards.reducer';
import { HandsCardsEffects } from './+state/hands-cards/hands-cards.effects';
import { HandsCardsFacade } from './+state/hands-cards/hands-cards.facade';
import * as fromHandsCards from './+state/hands-cards/hands-cards.reducer';
import { LandsPileCardsEffects } from './+state/lands-pile-cards/lands-pile-cards.effects';
import { LandsPileCardsFacade } from './+state/lands-pile-cards/lands-pile-cards.facade';
import * as fromLandsPileCards from './+state/lands-pile-cards/lands-pile-cards.reducer';
import { StockPilesCardsEffects } from './+state/stock-piles-cards/stock-piles-cards.effects';
import { StockPilesCardsFacade } from './+state/stock-piles-cards/stock-piles-cards.facade';
import * as fromStockPilesCards from './+state/stock-piles-cards/stock-piles-cards.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDice.DICE_FEATURE_KEY, fromDice.diceReducer),
    EffectsModule.forFeature([DiceEffects]),
    StoreModule.forFeature(
      fromFaceUpPilesCards.FACE_UP_PILES_CARDS_FEATURE_KEY,
      fromFaceUpPilesCards.faceUpPilesCardsReducer
    ),
    EffectsModule.forFeature([FaceUpPilesCardsEffects]),
    StoreModule.forFeature(
      fromDomainsCards.DOMAINS_CARDS_FEATURE_KEY,
      fromDomainsCards.domainsCardsReducer
    ),
    EffectsModule.forFeature([DomainsCardsEffects]),
    StoreModule.forFeature(
      fromHandsCards.HANDS_CARDS_FEATURE_KEY,
      fromHandsCards.handsCardsReducer
    ),
    EffectsModule.forFeature([HandsCardsEffects]),
    StoreModule.forFeature(
      fromStockPilesCards.STOCK_PILES_CARDS_FEATURE_KEY,
      fromStockPilesCards.stockPilesCardsReducer
    ),
    EffectsModule.forFeature([StockPilesCardsEffects]),
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
  ],
  providers: [
    DiceFacade,
    FaceUpPilesCardsFacade,
    DomainsCardsFacade,
    HandsCardsFacade,
    StockPilesCardsFacade,
    DiscardPileCardsFacade,
    EventsPileCardsFacade,
    LandsPileCardsFacade,
  ],
})
export class DataAccessGameModule {}
