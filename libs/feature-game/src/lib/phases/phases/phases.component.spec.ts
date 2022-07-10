import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsPileCardsFacade, GameFacade } from '@taormina/data-access-game';
import { MockProvider } from 'ng-mocks';
import { PhasesComponent } from './phases.component';

describe('PhasesComponent', () => {
  let component: PhasesComponent;
  let fixture: ComponentFixture<PhasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhasesComponent],
      providers: [
        MockProvider(GameFacade),
        MockProvider(EventsPileCardsFacade),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
