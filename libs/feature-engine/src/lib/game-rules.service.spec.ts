import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  DomainsCardsFacade,
  EventsPileCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';

import { GameRulesService } from './game-rules.service';

describe('GameRulesService', () => {
  let service: GameRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        GameFacade,
        DomainsCardsFacade,
        LandsPileCardsFacade,
        EventsPileCardsFacade,
        StockPilesCardsFacade,
        HandsCardsFacade,
      ],
    });
    service = TestBed.inject(GameRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
