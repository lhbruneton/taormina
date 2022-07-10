import { Component } from '@angular/core';
import {
  EventsPileCardsEntity,
  EventsPileCardsFacade,
  GameFacade,
} from '@taormina/data-access-game';
import { eventCards } from '@taormina/shared-constants';
import {
  ActionName,
  DomainColor,
  EventCard,
  GamePhase,
} from '@taormina/shared-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'taormina-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css'],
})
export class PhasesComponent {
  GamePhase = GamePhase;
  DomainColor = DomainColor;

  constructor(
    private game: GameFacade,
    private eventsPileCards: EventsPileCardsFacade
  ) {}

  getPhase(): Observable<GamePhase> {
    return this.game.phase$;
  }

  setPhase(phase: GamePhase): void {
    this.game.setPhase(phase);
  }

  getPlayer(): Observable<DomainColor> {
    return this.game.player$;
  }

  setPlayer(player: DomainColor): void {
    this.game.setPlayer(player);
  }

  getEventCard(cardId: string): EventCard | undefined {
    return eventCards.get(cardId);
  }

  getSelectedEventsPileCard(): Observable<EventsPileCardsEntity | undefined> {
    return this.eventsPileCards.selectedEventsPileCards$;
  }

  removeSelectedEventsPileCard(): void {
    this.eventsPileCards.removeSelected();
  }

  getAction(): Observable<ActionName | undefined> {
    return this.game.action$;
  }

  unsetAction(): void {
    this.game.setAction(undefined);
  }
}
