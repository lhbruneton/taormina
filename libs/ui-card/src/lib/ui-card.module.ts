import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { CardBackModule } from './card-back/card-back.module';
import { CardFrontModule } from './card-front/card-front.module';

@NgModule({
  imports: [CommonModule, CardBackModule, CardFrontModule],
  declarations: [CardComponent],
  exports: [CardBackModule, CardFrontModule],
})
export class UiCardModule {}
