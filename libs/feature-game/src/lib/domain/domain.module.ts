import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainComponent } from './domain/domain.component';
import { UiCardModule } from '@taormina/ui-card';

@NgModule({
  declarations: [DomainComponent],
  imports: [CommonModule, UiCardModule],
  exports: [DomainComponent],
})
export class DomainModule {}
