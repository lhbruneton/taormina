import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DiscardPileEffects } from './discard-pile.effects';
import * as DiscardPileActions from './discard-pile.actions';

describe('DiscardPileEffects', () => {
  let actions: Observable<any>;
  let effects: DiscardPileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DiscardPileEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DiscardPileEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiscardPileActions.init() });

      const expected = hot('-a-|', {
        a: DiscardPileActions.loadDiscardPileSuccess({ discardPile: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
