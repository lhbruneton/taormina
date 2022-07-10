import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhasesComponent } from './phases/phases.component';

@NgModule({
  declarations: [PhasesComponent],
  imports: [CommonModule, FormsModule],
  exports: [PhasesComponent],
})
export class PhasesModule {}
