import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import {
  CardsFacade,
  DiceFacade,
  DomainCardsFacade,
  DomainsFacade,
  EventsPileCardsFacade,
  LandsPileCardsFacade,
  StockPileCardsFacade,
  StockPilesFacade,
} from '@taormina/data-access-game';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [StoreModule.forRoot({})],
      providers: [
        DiceFacade,
        CardsFacade,
        DomainsFacade,
        DomainCardsFacade,
        LandsPileCardsFacade,
        EventsPileCardsFacade,
        StockPilesFacade,
        StockPileCardsFacade,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
