import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { ACTION_CARD_INTERFACE_NAME } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { DiscardPileCardsEffects } from './discard-pile-cards.effects';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn(() => 'AAA'),
  };
});

describe('DiscardPileCardsEffects', () => {
  let actions: Observable<Action>;
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

  describe('addCard$', () => {
    it('should dispatch addDiscardPileCard', () => {
      actions = hot('-a-|', {
        a: DiscardPileCardsActions.addCardToDiscardPile({
          card: { type: ACTION_CARD_INTERFACE_NAME, id: 'A' },
        }),
      });

      const expected = hot('-a-|', {
        a: DiscardPileCardsActions.addDiscardPileCard({
          discardPileCard: {
            id: 'AAA',
            cardType: ACTION_CARD_INTERFACE_NAME,
            cardId: 'A',
          },
        }),
      });

      expect(effects.addCard$).toBeObservable(expected);
    });
  });
});
