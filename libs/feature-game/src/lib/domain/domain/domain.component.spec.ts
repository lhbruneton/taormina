import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainsCardsFacade } from '@taormina/data-access-game';
import { GameRulesService } from '@taormina/feature-engine';
import { MockProvider } from 'ng-mocks';
import { DomainComponent } from './domain.component';

describe('DomainComponent', () => {
  let component: DomainComponent;
  let fixture: ComponentFixture<DomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomainComponent],
      providers: [
        MockProvider(DomainsCardsFacade),
        MockProvider(GameRulesService),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
