import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandComponent } from './hand/hand.component';

@NgModule({
  declarations: [HandComponent],
  imports: [CommonModule],
  exports: [HandComponent],
})
export class HandModule {}
