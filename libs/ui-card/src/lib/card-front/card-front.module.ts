import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardFrontComponent } from './card-front/card-front.component';

@NgModule({
  declarations: [CardFrontComponent],
  imports: [CommonModule],
  exports: [CardFrontComponent],
})
export class CardFrontModule {}
