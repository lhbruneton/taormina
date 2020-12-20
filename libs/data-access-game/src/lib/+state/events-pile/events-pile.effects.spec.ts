import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { EventsPileEffects } from './events-pile.effects';
import * as EventsPileActions from './events-pile.actions';

describe('EventsPileEffects', () => {
  let actions: Observable<any>;
  let effects: EventsPileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EventsPileEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(EventsPileEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EventsPileActions.init() });

      const expected = hot('-a-|', {
        a: EventsPileActions.loadEventsPileSuccess({ eventsPile: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
