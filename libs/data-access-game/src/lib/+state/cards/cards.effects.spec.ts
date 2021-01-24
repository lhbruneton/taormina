import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CardsActions from './cards.actions';
import { CardsEffects } from './cards.effects';

jest.mock('./models/action', () => {
  return {
    __esModule: true,
    createInitialActionCards: jest.fn(() => []),
  };
});

jest.mock('./models/agglomeration', () => {
  return {
    __esModule: true,
    createInitialDomainAgglomerationCards: jest.fn(() => []),
  };
});

jest.mock('./models/development', () => {
  return {
    __esModule: true,
    createInitialDevelopmentCards: jest.fn(() => []),
  };
});

jest.mock('./models/land', () => {
  return {
    __esModule: true,
    createInitialDomainLandCards: jest.fn(() => []),
  };
});

describe('CardsEffects', () => {
  let actions: Observable<any>;
  let effects: CardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CardsActions.initCardsNewGame() });

      const expected = hot('-a-|', {
        a: CardsActions.setCardsInitialized({ cards: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CardsActions.initCardsSavedGame() });

      const expected = hot('-a-|', {
        a: CardsActions.loadCardsSuccess({ cards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
