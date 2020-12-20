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
  ],
  providers: [DomainsFacade, HandsFacade],
})
export class DataAccessGameModule {}
