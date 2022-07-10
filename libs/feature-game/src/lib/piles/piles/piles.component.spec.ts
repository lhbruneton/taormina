import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DiscardPileCardsFacade,
  DomainsCardsFacade,
  EventsPileCardsFacade,
  FaceUpPilesCardsFacade,
  GameFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { PilesComponent } from './piles.component';

describe('PilesComponent', () => {
  let component: PilesComponent;
  let fixture: ComponentFixture<PilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PilesComponent],
      providers: [
        MockProvider(GameFacade, {
          phase$: EMPTY,
          player$: EMPTY,
        }),
        MockProvider(DomainsCardsFacade),
        MockProvider(FaceUpPilesCardsFacade, {
          allRoadPivots$: EMPTY,
          allHamletPivots$: EMPTY,
          allTownPivots$: EMPTY,
        }),
        MockProvider(LandsPileCardsFacade, {
          allLandsPileCards$: EMPTY,
        }),
        MockProvider(StockPilesCardsFacade, {
          allStockPilesCards$: EMPTY,
        }),
        MockProvider(EventsPileCardsFacade),
        MockProvider(DiscardPileCardsFacade),
        MockProvider(GameRulesService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
