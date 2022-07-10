import { Component } from '@angular/core';
import { GameRulesService } from '@taormina/feature-engine';

@Component({
  selector: 'taormina-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private gameRules: GameRulesService) {}

  startNewGame(): void {
    this.gameRules.initNewGame();
  }
}
