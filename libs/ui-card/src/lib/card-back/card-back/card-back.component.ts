import { Component, Input } from '@angular/core';
import { getImgSrc } from '@taormina/shared-utils';

@Component({
  selector: 'taormina-card-back',
  templateUrl: './card-back.component.html',
  styleUrls: ['./card-back.component.css'],
})
export class CardBackComponent {
  @Input() typeIconName!: string;
  @Input() ressources?: { iconName: string; count: number }[];

  Array = Array;
  getImgSrc = getImgSrc;
}
