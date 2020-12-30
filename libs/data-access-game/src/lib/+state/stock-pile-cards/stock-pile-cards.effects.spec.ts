import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { StockPileCardsEffects } from './stock-pile-cards.effects';
import * as StockPileCardsActions from './stock-pile-cards.actions';

describe('StockPileCardsEffects', () => {
  let actions: Observable<any>;
  let effects: StockPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        StockPileCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(StockPileCardsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StockPileCardsActions.init() });

      const expected = hot('-a-|', {
        a: StockPileCardsActions.loadStockPileCardsSuccess({
          stockPileCards: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
