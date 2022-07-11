import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DomainsCardsFacade,
  AgglomerationPilesCardsFacade,
  GameFacade,
  HandsCardsFacade,
  LandsPileCardsFacade,
} from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { ActionsComponent } from './actions.component';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        MockProvider(GameFacade, {
          phase$: EMPTY,
        }),
        MockProvider(DomainsCardsFacade, {
          selectedDomainsCards$: EMPTY,
        }),
        MockProvider(HandsCardsFacade, {
          selectedHandsCards$: EMPTY,
        }),
        MockProvider(AgglomerationPilesCardsFacade),
        MockProvider(LandsPileCardsFacade),
        MockProvider(GameRulesService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
