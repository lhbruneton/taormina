import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DiceEffects } from './dice.effects';
import * as DiceActions from './dice.actions';

describe('DiceEffects', () => {
  let actions: Observable<any>;
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

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiceActions.init() });

      const expected = hot('-a-|', {
        a: DiceActions.loadDiceSuccess({ dice: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
