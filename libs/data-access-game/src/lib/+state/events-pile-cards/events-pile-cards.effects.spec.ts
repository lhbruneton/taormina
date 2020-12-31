import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { EventsPileCardsEffects } from './events-pile-cards.effects';
import * as EventsPileCardsActions from './events-pile-cards.actions';

describe('EventsPileCardsEffects', () => {
  let actions: Observable<any>;
  let effects: EventsPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EventsPileCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(EventsPileCardsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: EventsPileCardsActions.initEventsPileCards(),
      });

      const expected = hot('-a-|', {
        a: EventsPileCardsActions.loadEventsPileCardsSuccess({
          eventsPileCards: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
