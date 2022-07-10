import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { ActionsModule } from '../actions/actions.module';
import { DiceModule } from '../dice/dice.module';
import { DomainModule } from '../domain/domain.module';
import { HandModule } from '../hand/hand.module';
import { PhasesModule } from '../phases/phases.module';
import { PilesModule } from '../piles/piles.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    ActionsModule,
    DiceModule,
    DomainModule,
    HandModule,
    PhasesModule,
    PilesModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}
