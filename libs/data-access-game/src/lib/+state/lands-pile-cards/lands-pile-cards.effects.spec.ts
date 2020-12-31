import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { LandsPileCardsEffects } from './lands-pile-cards.effects';
import * as LandsPileCardsActions from './lands-pile-cards.actions';

describe('LandsPileCardsEffects', () => {
  let actions: Observable<any>;
  let effects: LandsPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LandsPileCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(LandsPileCardsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LandsPileCardsActions.initLandsPileCards() });

      const expected = hot('-a-|', {
        a: LandsPileCardsActions.loadLandsPileCardsSuccess({
          landsPileCards: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
