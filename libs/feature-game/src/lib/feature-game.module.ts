import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardModule } from './board/board.module';

@NgModule({
  imports: [CommonModule, BoardModule],
  exports: [BoardModule],
})
export class FeatureGameModule {}
