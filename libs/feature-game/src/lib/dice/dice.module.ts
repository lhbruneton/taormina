import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './dice/dice.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DiceComponent],
  imports: [CommonModule, FormsModule],
  exports: [DiceComponent],
})
export class DiceModule {}
