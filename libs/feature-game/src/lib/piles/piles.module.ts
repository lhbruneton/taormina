import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PilesComponent } from './piles/piles.component';

@NgModule({
  declarations: [PilesComponent],
  imports: [CommonModule],
  exports: [PilesComponent],
})
export class PilesModule {}
