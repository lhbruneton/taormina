import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventsPileCardsEffects } from './events-pile-cards.effects';

jest.mock('../cards/models/event', () => {
  return {
    __esModule: true,
    getShuffledInitialEventCards: jest.fn(() => []),
  };
});

describe('EventsPileCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: EventsPileCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EventsPileCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(EventsPileCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: EventsPileCardsActions.initEventsPileCardsNewGame(),
      });

      const expected = hot('-a-|', {
        a: EventsPileCardsActions.setEventsPileCardsInitialized({
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
});
