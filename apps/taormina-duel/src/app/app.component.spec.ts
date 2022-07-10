import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { GameRulesService } from '@taormina/feature-engine';
import { FeatureGameModule } from '@taormina/feature-game';
import { MockInstance, MockModule, MockProvider } from 'ng-mocks';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [StoreModule.forRoot({}), MockModule(FeatureGameModule)],
      providers: [MockProvider(GameRulesService)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  describe('startNewGame', () => {
    const initNewGame = jest.fn();
    beforeEach(async () => {
      MockInstance(GameRulesService, () => ({
        initNewGame,
      }));
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      component.startNewGame();
    });

    it('should call initNewGame', () => {
      expect(initNewGame).toHaveBeenCalled();
    });
  });
});
