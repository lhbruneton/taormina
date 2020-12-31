import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { StockPilesEffects } from './stock-piles.effects';
import * as StockPilesActions from './stock-piles.actions';

describe('StockPilesEffects', () => {
  let actions: Observable<any>;
  let effects: StockPilesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        StockPilesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(StockPilesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StockPilesActions.initStockPiles() });

      const expected = hot('-a-|', {
        a: StockPilesActions.loadStockPilesSuccess({ stockPiles: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
