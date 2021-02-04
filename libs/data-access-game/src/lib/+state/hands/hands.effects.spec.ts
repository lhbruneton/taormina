import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as HandsActions from './hands.actions';
import { HandsEffects } from './hands.effects';

jest.mock('./hands.models', () => {
  return {
    __esModule: true,
    createInitialHands: jest.fn(() => []),
  };
});

describe('HandsEffects', () => {
  let actions: Observable<Action>;
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
