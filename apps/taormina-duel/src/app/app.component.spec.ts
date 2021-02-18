import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  DiceFacade,
  DomainsCardsFacade,
  EventsPileCardsFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
  StockPilesCardsFacade,
} from '@taormina/data-access-game';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        DiceFacade,
        DomainsCardsFacade,
        LandsPileCardsFacade,
        EventsPileCardsFacade,
        StockPilesCardsFacade,
        HandsCardsFacade,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
