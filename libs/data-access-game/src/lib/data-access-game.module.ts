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

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDomains.DOMAINS_FEATURE_KEY,
      fromDomains.reducer
    ),
    EffectsModule.forFeature([DomainsEffects]),
    StoreModule.forFeature(fromHands.HANDS_FEATURE_KEY, fromHands.reducer),
    EffectsModule.forFeature([HandsEffects]),
    StoreModule.forFeature(fromDice.DICE_FEATURE_KEY, fromDice.reducer),
    EffectsModule.forFeature([DiceEffects]),
    StoreModule.forFeature(
      fromDiscardPile.DISCARDPILE_FEATURE_KEY,
      fromDiscardPile.reducer
    ),
    EffectsModule.forFeature([DiscardPileEffects]),
  ],
  providers: [DomainsFacade, HandsFacade, DiceFacade, DiscardPileFacade],
})
export class DataAccessGameModule {}
