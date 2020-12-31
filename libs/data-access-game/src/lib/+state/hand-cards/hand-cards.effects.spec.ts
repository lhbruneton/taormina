import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { HandCardsEffects } from './hand-cards.effects';
import * as HandCardsActions from './hand-cards.actions';

describe('HandCardsEffects', () => {
  let actions: Observable<any>;
  let effects: HandCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HandCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(HandCardsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandCardsActions.initHandCards() });

      const expected = hot('-a-|', {
        a: HandCardsActions.loadHandCardsSuccess({ handCards: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
