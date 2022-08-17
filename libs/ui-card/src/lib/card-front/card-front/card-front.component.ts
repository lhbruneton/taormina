import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getImgSrc } from '@taormina/shared-utils';

@Component({
  selector: 'taormina-card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['./card-front.component.css'],
})
export class CardFrontComponent {
  @Input() typeIconName!: string;
  @Input() dieIconName?: string;
  @Input() selected?: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  getImgSrc = getImgSrc;
}
