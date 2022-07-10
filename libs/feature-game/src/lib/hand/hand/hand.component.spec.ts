import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HandsCardsFacade } from '@taormina/data-access-game';
import { MockProvider } from 'ng-mocks';
import { HandComponent } from './hand.component';

describe('HandComponent', () => {
  let component: HandComponent;
  let fixture: ComponentFixture<HandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandComponent],
      providers: [MockProvider(HandsCardsFacade)],
    }).compileComponents();

    fixture = TestBed.createComponent(HandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
