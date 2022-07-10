import { Component, Input } from '@angular/core';
import { HandsCardsEntity, HandsCardsFacade } from '@taormina/data-access-game';
import {
  actionCards,
  developmentCards,
  hands,
} from '@taormina/shared-constants';
import {
  ActionCard,
  ACTION_CARD_INTERFACE_NAME,
  DevelopmentCard,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  Hand,
} from '@taormina/shared-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'taormina-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css'],
})
export class HandComponent {
  @Input() handId!: string;

  ACTION_CARD_INTERFACE_NAME = ACTION_CARD_INTERFACE_NAME;
  DEVELOPMENT_CARD_INTERFACE_NAME = DEVELOPMENT_CARD_INTERFACE_NAME;

  constructor(private handsCards: HandsCardsFacade) {}

  getHand(): Hand | undefined {
    return hands.get(this.handId);
  }

  getHandsCards(handId: string): Observable<HandsCardsEntity[]> {
    return this.handsCards.allHandsCards$.pipe(
      map((handsCards) =>
        handsCards.filter((handCard) => handCard.handId === handId)
      )
    );
  }

  getActionCard(cardId: string): ActionCard | undefined {
    return actionCards.get(cardId);
  }

  getDevelopmentCard(cardId: string): DevelopmentCard | undefined {
    return developmentCards.get(cardId);
  }

  selectHandCard(pivotId: string): void {
    this.handsCards.selectHandCard(pivotId);
  }
}
