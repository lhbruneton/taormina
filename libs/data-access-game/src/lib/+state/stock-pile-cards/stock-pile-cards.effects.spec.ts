import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CardsSelectors from '../cards/cards.selectors';
import * as StockPilesSelectors from '../stock-piles/stock-piles.selectors';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import { StockPileCardsEffects } from './stock-pile-cards.effects';

jest.mock('./stock-pile-cards.models', () => {
  return {
    __esModule: true,
    createInitialStockPileCards: jest.fn(() => []),
  };
});

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
        provideMockStore({
          selectors: [
            {
              selector: CardsSelectors.getAllCards,
              value: [],
            },
            {
              selector: StockPilesSelectors.getAllStockPiles,
              value: [],
            },
          ],
        }),
      ],
    });

    effects = TestBed.get(StockPileCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: StockPileCardsActions.initStockPileCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: StockPileCardsActions.setStockPileCardsInitialized({
          stockPileCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: StockPileCardsActions.initStockPileCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: StockPileCardsActions.loadStockPileCardsSuccess({
          stockPileCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
