import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as StockPilesActions from './stock-piles.actions';
import { StockPilesEffects } from './stock-piles.effects';

jest.mock('./stock-piles.models', () => {
  return {
    __esModule: true,
    createInitialStockPiles: jest.fn(() => []),
  };
});

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
