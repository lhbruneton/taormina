import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  DiscardPileCardsFacade,
  DomainsCardsFacade,
  EventsPileCardsFacade,
  FaceUpPilesCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule, StoreModule.forRoot({})],
      providers: [
        GameFacade,
        DomainsCardsFacade,
        HandsCardsFacade,
        FaceUpPilesCardsFacade,
        LandsPileCardsFacade,
        StockPilesCardsFacade,
        EventsPileCardsFacade,
        DiscardPileCardsFacade,
        GameRulesService,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
