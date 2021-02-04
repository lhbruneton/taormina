import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as HandCardsActions from './hand-cards.actions';
import { HandCardsEffects } from './hand-cards.effects';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn(() => 'AAA'),
  };
});

describe('HandCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: HandCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        HandCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(HandCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandCardsActions.initHandCardsNewGame() });

      const expected = hot('-a-|', {
        a: HandCardsActions.setHandCardsInitialized({ handCards: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: HandCardsActions.initHandCardsSavedGame() });

      const expected = hot('-a-|', {
        a: HandCardsActions.loadHandCardsSuccess({ handCards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('addCards$', () => {
    it('should dispatch addHandCards', () => {
      actions = hot('-a-|', {
        a: HandCardsActions.addCardsToHand({
          handId: 'A',
          cardIds: ['A'],
        }),
      });

      const expected = hot('-a-|', {
        a: HandCardsActions.addHandCards({
          handCards: [{ id: 'AAA', handId: 'A', cardId: 'A' }],
        }),
      });

      expect(effects.addCards$).toBeObservable(expected);
    });
  });
});
