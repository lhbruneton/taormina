import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { LandsPileCardsEffects } from './lands-pile-cards.effects';

jest.mock('./lands-pile-cards.models', () => {
  return {
    __esModule: true,
    createInitialLandsPileCards: jest.fn(() => []),
  };
});

describe('LandsPileCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: LandsPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LandsPileCardsEffects,
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
