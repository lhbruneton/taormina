import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { ActionsModule } from '../../actions/actions.module';
import { DiceModule } from '../../dice/dice.module';
import { DomainModule } from '../../domain/domain.module';
import { HandModule } from '../../hand/hand.module';
import { PhasesModule } from '../../phases/phases.module';
import { PilesModule } from '../../piles/piles.module';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [
        MockModule(ActionsModule),
        MockModule(DiceModule),
        MockModule(DomainModule),
        MockModule(HandModule),
        MockModule(PhasesModule),
        MockModule(PilesModule),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
