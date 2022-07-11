import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DiscardPileCardsEffects } from './+state/discard-pile-cards/discard-pile-cards.effects';
import { DiscardPileCardsFacade } from './+state/discard-pile-cards/discard-pile-cards.facade';
import * as fromDiscardPileCards from './+state/discard-pile-cards/discard-pile-cards.reducer';
import { DomainsCardsEffects } from './+state/domains-cards/domains-cards.effects';
import { DomainsCardsFacade } from './+state/domains-cards/domains-cards.facade';
import * as fromDomainsCards from './+state/domains-cards/domains-cards.reducer';
import { EventsPileCardsEffects } from './+state/events-pile-cards/events-pile-cards.effects';
import { EventsPileCardsFacade } from './+state/events-pile-cards/events-pile-cards.facade';
import * as fromEventsPileCards from './+state/events-pile-cards/events-pile-cards.reducer';
import { AgglomerationPilesCardsEffects } from './+state/agglomeration-piles-cards/agglomeration-piles-cards.effects';
import { AgglomerationPilesCardsFacade } from './+state/agglomeration-piles-cards/agglomeration-piles-cards.facade';
import * as fromAgglomerationPilesCards from './+state/agglomeration-piles-cards/agglomeration-piles-cards.reducer';
import { GameEffects } from './+state/game/game.effects';
import { GameFacade } from './+state/game/game.facade';
import * as fromGame from './+state/game/game.reducer';
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
    StoreModule.forFeature(fromGame.GAME_FEATURE_KEY, fromGame.gameReducer),
    EffectsModule.forFeature([GameEffects]),
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
      fromAgglomerationPilesCards.AGGLOMERATION_PILES_CARDS_FEATURE_KEY,
      fromAgglomerationPilesCards.agglomerationPilesCardsReducer
    ),
    EffectsModule.forFeature([EventsPileCardsEffects]),
    StoreModule.forFeature(
      fromLandsPileCards.LANDS_PILE_CARDS_FEATURE_KEY,
      fromLandsPileCards.landsPileCardsReducer
    ),
    EffectsModule.forFeature([AgglomerationPilesCardsEffects]),
    StoreModule.forFeature(
      fromStockPilesCards.STOCK_PILES_CARDS_FEATURE_KEY,
      fromStockPilesCards.stockPilesCardsReducer
    ),
    EffectsModule.forFeature([StockPilesCardsEffects]),
    StoreModule.forFeature(
      fromEventsPileCards.EVENTS_PILE_CARDS_FEATURE_KEY,
      fromEventsPileCards.eventsPileCardsReducer
    ),
    EffectsModule.forFeature([LandsPileCardsEffects]),
    StoreModule.forFeature(
      fromDiscardPileCards.DISCARD_PILE_CARDS_FEATURE_KEY,
      fromDiscardPileCards.discardPileCardsReducer
    ),
    EffectsModule.forFeature([DiscardPileCardsEffects]),
  ],
  providers: [
    GameFacade,
    DomainsCardsFacade,
    HandsCardsFacade,
    AgglomerationPilesCardsFacade,
    LandsPileCardsFacade,
    StockPilesCardsFacade,
    EventsPileCardsFacade,
    DiscardPileCardsFacade,
  ],
})
export class DataAccessGameModule {}
