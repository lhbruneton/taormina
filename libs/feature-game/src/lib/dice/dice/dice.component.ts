import { Component } from '@angular/core';
import { GameFacade } from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import {
  EventValue,
  GamePhase,
  ResourceValue,
  RESOURCE_VALUES,
} from '@taormina/shared-models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'taormina-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css'],
})
export class DiceComponent {
  RESOURCE_VALUES = RESOURCE_VALUES;

  constructor(private game: GameFacade, private gameRules: GameRulesService) {}

  throwDisabled(): Observable<boolean> {
    return this.game.phase$.pipe(
      map(
        (phase) =>
          phase !== GamePhase.InitialThrow && phase !== GamePhase.LoopThrow
      )
    );
  }

  onThrow(): void {
    this.gameRules.throwDice();
  }

  getProductionDie(): Observable<ResourceValue | undefined> {
    return this.game.productionDie$;
  }

  getEventDie(): Observable<EventValue | undefined> {
    return this.game.eventDie$;
  }

  getNextProductionDie(): Observable<ResourceValue | undefined> {
    return this.game.nextProductionDie$;
  }

  setNextProductionDie(value: ResourceValue): void {
    this.game.setNextProductionDie(value);
  }
}
