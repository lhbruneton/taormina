import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { ACTION_CARD_INTERFACE_NAME } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import { StockPilesCardsEffects } from './stock-piles-cards.effects';
import * as StockPilesCardsSelectors from './stock-piles-cards.selectors';

jest.mock('./stock-piles-cards.models', () => {
  return {
    __esModule: true,
    createInitialStockPilesCards: jest.fn(() => []),
  };
});

describe('StockPilesCardsEffects', () => {
  let injector: Injector;
  let actions: Observable<Action>;
  let effects: StockPilesCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        StockPilesCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(StockPilesCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: StockPilesCardsActions.initStockPilesCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: StockPilesCardsActions.setStockPilesCardsInitialized({
          stockPilesCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: StockPilesCardsActions.initStockPilesCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: StockPilesCardsActions.loadStockPilesCardsSuccess({
          stockPilesCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('removeCards$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector:
                  StockPilesCardsSelectors.getStockPileCardEntityByPivot,
                value: {
                  id: 'AAA',
                  stockPileId: 'A',
                  cardType: ACTION_CARD_INTERFACE_NAME,
                  cardId: 'A',
                },
              },
            ],
          }),
        ],
      });
      injector.get(MockStore);
    });

    it('should dispatch removeStockPilesCards', () => {
      actions = hot('-a-|', {
        a: StockPilesCardsActions.removeCardsFromStockPile({
          stockPileId: 'A',
          cards: [{ type: ACTION_CARD_INTERFACE_NAME, id: 'A' }],
        }),
      });

      const expected = hot('-a-|', {
        a: StockPilesCardsActions.removeStockPilesCards({
          stockPileCardIds: ['AAA'],
        }),
      });

      expect(effects.removeCards$).toBeObservable(expected);
    });
  });
});
