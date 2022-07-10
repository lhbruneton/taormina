import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainComponent } from './domain/domain.component';

@NgModule({
  declarations: [DomainComponent],
  imports: [CommonModule],
  exports: [DomainComponent],
})
export class DomainModule {}
