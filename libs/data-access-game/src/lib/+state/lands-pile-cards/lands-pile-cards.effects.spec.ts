import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { LandsPileCardsEffects } from './lands-pile-cards.effects';

jest.mock('../cards/models/land', () => {
  return {
    __esModule: true,
    createInitialLandCards: jest.fn(() => []),
  };
});

describe('LandsPileCardsEffects', () => {
  let actions: Observable<any>;
  let effects: LandsPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LandsPileCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(LandsPileCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: LandsPileCardsActions.initLandsPileCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: LandsPileCardsActions.setLandsPileCardsInitialized({
          landsPileCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: LandsPileCardsActions.initLandsPileCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: LandsPileCardsActions.loadLandsPileCardsSuccess({
          landsPileCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
