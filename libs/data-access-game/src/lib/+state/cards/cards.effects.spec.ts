import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as HandCardsActions from '../hand-cards/hand-cards.actions';
import * as StockPileCardsActions from '../stock-pile-cards/stock-pile-cards.actions';
import * as StockPileCardsSelectors from '../stock-pile-cards/stock-pile-cards.selectors';

import * as CardsActions from './cards.actions';
import { CardsEffects } from './cards.effects';

jest.mock('./models/action', () => {
  return {
    __esModule: true,
    createInitialActionCards: jest.fn(() => []),
  };
});

jest.mock('./models/agglomeration', () => {
  return {
    __esModule: true,
    createInitialDomainAgglomerationCards: jest.fn(() => []),
  };
});

jest.mock('./models/development', () => {
  return {
    __esModule: true,
    createInitialDevelopmentCards: jest.fn(() => []),
  };
});

jest.mock('./models/land', () => {
  return {
    __esModule: true,
    createInitialDomainLandCards: jest.fn(() => []),
  };
});

describe('CardsEffects', () => {
  let actions: Observable<any>;
  let effects: CardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({
          selectors: [
            {
              selector: StockPileCardsSelectors.getAllStockPileCards,
              value: [
                { id: 'AAA', stockPileId: 'A', cardId: 'A' },
                { id: 'BBB', stockPileId: 'B', cardId: 'B' },
                { id: 'CCC', stockPileId: 'A', cardId: 'C' },
                { id: 'DDD', stockPileId: 'B', cardId: 'D' },
                { id: 'EEE', stockPileId: 'A', cardId: 'E' },
              ],
            },
          ],
        }),
      ],
    });

    effects = TestBed.get(CardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CardsActions.initCardsNewGame() });

      const expected = hot('-a-|', {
        a: CardsActions.setCardsInitialized({ cards: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CardsActions.initCardsSavedGame() });

      const expected = hot('-a-|', {
        a: CardsActions.loadCardsSuccess({ cards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('drawFromStockToHand$', () => {
    it('should dispatch removeCardsFromStockPile and addCardsToHand on drawCardsFromStockToHand', () => {
      actions = hot('a', {
        a: CardsActions.drawCardsFromStockToHand({
          stockPileId: 'A',
          cardsCount: 2,
          handId: 'A',
        }),
      });

      const expected = hot('(ab)', {
        a: StockPileCardsActions.removeCardsFromStockPile({
          stockPileId: 'A',
          cardIds: ['A', 'C'],
        }),
        b: HandCardsActions.addCardsToHand({
          handId: 'A',
          cardIds: ['A', 'C'],
        }),
      });

      expect(effects.drawFromStockToHand$).toBeObservable(expected);
    });
  });
});
