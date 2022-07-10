import { Component } from '@angular/core';
import {
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_HAND_BLUE,
  ID_HAND_RED,
} from '@taormina/shared-constants';

@Component({
  selector: 'taormina-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  ID_HAND_RED = ID_HAND_RED;
  ID_HAND_BLUE = ID_HAND_BLUE;
  ID_DOMAIN_RED = ID_DOMAIN_RED;
  ID_DOMAIN_BLUE = ID_DOMAIN_BLUE;
}
