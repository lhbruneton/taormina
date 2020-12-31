import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DiscardPileCardsEffects } from './discard-pile-cards.effects';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';

describe('DiscardPileCardsEffects', () => {
  let actions: Observable<any>;
  let effects: DiscardPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DiscardPileCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DiscardPileCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: DiscardPileCardsActions.initDiscardPileCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: DiscardPileCardsActions.setDiscardPileCardsInitialized({
          discardPileCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: DiscardPileCardsActions.initDiscardPileCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: DiscardPileCardsActions.loadDiscardPileCardsSuccess({
          discardPileCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
