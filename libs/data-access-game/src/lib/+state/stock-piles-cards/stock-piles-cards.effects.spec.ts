import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, createSelector } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { ACTION_CARD_INTERFACE_NAME } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as StockPilesCardsActions from './stock-piles-cards.actions';
import { StockPilesCardsEffects } from './stock-piles-cards.effects';
import * as StockPilesCardsModels from './stock-piles-cards.models';
import * as StockPilesCardsSelectors from './stock-piles-cards.selectors';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn(() => 'AAA'),
  };
});

describe('StockPilesCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: StockPilesCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockPilesCardsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(StockPilesCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      jest
        .spyOn(StockPilesCardsModels, 'createInitialStockPilesCards')
        .mockReturnValue([]);

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
    it('should dispatch removeStockPilesCards', () => {
      const expectedId = 'AAA';
      jest
        .spyOn(StockPilesCardsSelectors, 'getStockPileCardEntityByPivot')
        .mockImplementation(
          (pileId: string, cardType: string, cardId: string) =>
            createSelector(
              () => [] as StockPilesCardsModels.StockPilesCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: expectedId,
                  pileId,
                  cardType,
                  cardId,
                } as StockPilesCardsModels.StockPilesCardsEntity | undefined)
            )
        );

      actions = hot('-a-|', {
        a: StockPilesCardsActions.removeCardsFromStockPileTop({
          pileId: 'A',
          cards: [{ type: ACTION_CARD_INTERFACE_NAME, id: 'A' }],
        }),
      });

      const expected = hot('-a-|', {
        a: StockPilesCardsActions.removeStockPilesCards({
          ids: [expectedId],
        }),
      });

      expect(effects.removeCards$).toBeObservable(expected);
    });
  });

  describe('addCards$', () => {
    it('should dispatch addStockPilesCards', () => {
      actions = hot('-a-|', {
        a: StockPilesCardsActions.addCardsToStockPileBottom({
          pileId: 'A',
          cards: [{ type: ACTION_CARD_INTERFACE_NAME, id: 'A' }],
        }),
      });

      const expected = hot('-a-|', {
        a: StockPilesCardsActions.addStockPilesCards({
          stockPilesCards: [
            {
              id: 'AAA',
              pileId: 'A',
              cardType: ACTION_CARD_INTERFACE_NAME,
              cardId: 'A',
            },
          ],
        }),
      });

      expect(effects.addCards$).toBeObservable(expected);
    });
  });
});
