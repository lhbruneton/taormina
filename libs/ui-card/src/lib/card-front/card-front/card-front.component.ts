import { Component, Input } from '@angular/core';
import { getImgSrc } from '@taormina/shared-utils';

@Component({
  selector: 'taormina-card-front',
  templateUrl: './card-front.component.html',
  styleUrls: ['./card-front.component.css'],
})
export class CardFrontComponent {
  @Input() typeIconName!: string;
  @Input() dieIconName?: string;

  getImgSrc = getImgSrc;
}
