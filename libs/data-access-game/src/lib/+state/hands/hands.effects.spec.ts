import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { HandsEffects } from './hands.effects';
import * as HandsActions from './hands.actions';

jest.mock('./hands.models', () => {
  return {
    __esModule: true,
    createInitialHands: jest.fn(() => []),
  };
});

describe('HandsEffects', () => {
  let actions: Observable<any>;
  let effects: HandsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HandsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(HandsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandsActions.initHandsNewGame() });

      const expected = hot('-a-|', {
        a: HandsActions.setHandsInitialized({ hands: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandsActions.initHandsSavedGame() });

      const expected = hot('-a-|', {
        a: HandsActions.loadHandsSuccess({ hands: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
