import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { ACTION_CARD_INTERFACE_NAME } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as HandsCardsActions from './hands-cards.actions';
import { HandsCardsEffects } from './hands-cards.effects';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn(() => 'AAA'),
  };
});

describe('HandsCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: HandsCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HandsCardsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(HandsCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandsCardsActions.initHandsCardsNewGame() });

      const expected = hot('-a-|', {
        a: HandsCardsActions.setHandsCardsInitialized({ handsCards: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandsCardsActions.initHandsCardsSavedGame() });

      const expected = hot('-a-|', {
        a: HandsCardsActions.loadHandsCardsSuccess({ handsCards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('addCards$', () => {
    it('should dispatch addHandsCards', () => {
      actions = hot('-a-|', {
        a: HandsCardsActions.addCardsToHand({
          handId: 'A',
          cards: [{ type: ACTION_CARD_INTERFACE_NAME, id: 'A' }],
        }),
      });

      const expected = hot('-a-|', {
        a: HandsCardsActions.addHandsCards({
          handsCards: [
            {
              id: 'AAA',
              handId: 'A',
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
