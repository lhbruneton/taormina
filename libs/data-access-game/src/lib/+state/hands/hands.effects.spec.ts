import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { HandsEffects } from './hands.effects';
import * as HandsActions from './hands.actions';

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

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandsActions.initHands() });

      const expected = hot('-a-|', {
        a: HandsActions.loadHandsSuccess({ hands: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
