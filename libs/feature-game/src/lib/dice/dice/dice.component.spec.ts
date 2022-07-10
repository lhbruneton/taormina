import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameFacade } from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';
import { DiceComponent } from './dice.component';

describe('DiceComponent', () => {
  let component: DiceComponent;
  let fixture: ComponentFixture<DiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiceComponent],
      providers: [
        MockProvider(GameFacade, {
          phase$: EMPTY,
        }),
        MockProvider(GameRulesService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
