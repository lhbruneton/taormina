import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { CardBackModule } from './card-back/card-back.module';

@NgModule({
  imports: [CommonModule, CardBackModule],
  declarations: [CardComponent],
  exports: [CardBackModule],
})
export class UiCardModule {}
