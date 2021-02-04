import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as DiceActions from './dice.actions';
import { DiceEffects } from './dice.effects';

jest.mock('./dice.models', () => {
  return {
    __esModule: true,
    createRandomDice: jest.fn(() => []),
  };
});

describe('DiceEffects', () => {
  let actions: Observable<Action>;
  let effects: DiceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DiceEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DiceEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiceActions.initDiceNewGame() });

      const expected = hot('-a-|', {
        a: DiceActions.setDiceInitialized({ dice: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiceActions.initDiceSavedGame() });

      const expected = hot('-a-|', {
        a: DiceActions.loadDiceSuccess({ dice: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
