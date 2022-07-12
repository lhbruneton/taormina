import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiCardModule } from '@taormina/ui-card';
import { PilesComponent } from './piles/piles.component';

@NgModule({
  declarations: [PilesComponent],
  imports: [CommonModule, UiCardModule],
  exports: [PilesComponent],
})
export class PilesModule {}
