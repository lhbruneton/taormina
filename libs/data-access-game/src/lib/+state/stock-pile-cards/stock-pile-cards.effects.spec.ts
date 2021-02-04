import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as CardsSelectors from '../cards/cards.selectors';
import * as StockPilesSelectors from '../stock-piles/stock-piles.selectors';
import * as StockPileCardsActions from './stock-pile-cards.actions';
import { StockPileCardsEffects } from './stock-pile-cards.effects';
import * as StockPileCardsSelectors from './stock-pile-cards.selectors';

jest.mock('./stock-pile-cards.models', () => {
  return {
    __esModule: true,
    createInitialStockPileCards: jest.fn(() => []),
  };
});

describe('StockPileCardsEffects', () => {
  let actions: Observable<Action>;
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
            {
              selector:
                StockPileCardsSelectors.getStockPileCardEntityByStockPileIdCardId,
              value: { id: 'AAA', stockPileId: 'A', cardId: 'A' },
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

  describe('removeCards$', () => {
    it('should dispatch removeStockPileCards', () => {
      actions = hot('-a-|', {
        a: StockPileCardsActions.removeCardsFromStockPile({
          stockPileId: 'A',
          cardIds: ['A'],
        }),
      });

      const expected = hot('-a-|', {
        a: StockPileCardsActions.removeStockPileCards({
          stockPileCardIds: ['AAA'],
        }),
      });

      expect(effects.removeCards$).toBeObservable(expected);
    });
  });
});
