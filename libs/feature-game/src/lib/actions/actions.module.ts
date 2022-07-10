import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [ActionsComponent],
  imports: [CommonModule],
  exports: [ActionsComponent],
})
export class ActionsModule {}
