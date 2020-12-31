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

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StockPilesActions.initStockPilesNewGame() });

      const expected = hot('-a-|', {
        a: StockPilesActions.setStockPilesInitialized({ stockPiles: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: StockPilesActions.initStockPilesSavedGame() });

      const expected = hot('-a-|', {
        a: StockPilesActions.loadStockPilesSuccess({ stockPiles: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
