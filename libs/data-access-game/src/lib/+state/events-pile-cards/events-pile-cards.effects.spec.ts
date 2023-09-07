import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventsPileCardsEffects } from './events-pile-cards.effects';

jest.mock('./events-pile-cards.models', () => {
  return {
    __esModule: true,
    createInitialEventsPileCards: jest.fn(() => []),
  };
});

describe('EventsPileCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: EventsPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventsPileCardsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(EventsPileCardsEffects);
  });

  describe('initNewGame$', () => {
    it(`should call setEntitiesInitializedEventsPileCards
        with a mocked empty array of entities`, () => {
      actions = hot('-a-|', {
        a: EventsPileCardsActions.initEventsPileCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: EventsPileCardsActions.setEntitiesInitializedEventsPileCards({
          eventsPileCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: EventsPileCardsActions.initEventsPileCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: EventsPileCardsActions.loadEventsPileCardsSuccess({
          eventsPileCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('resetPileAndSelectFirst$', () => {
    it(`should call setEntitiesSelectFirstEventsPileCards
        with a mocked empty array of entities`, () => {
      actions = hot('-a-|', {
        a: EventsPileCardsActions.resetEventsPile(),
      });

      const expected = hot('-a-|', {
        a: EventsPileCardsActions.setEntitiesSelectFirstEventsPileCards({
          eventsPileCards: [],
        }),
      });

      expect(effects.resetPileAndSelectFirst$).toBeObservable(expected);
    });
  });
});
