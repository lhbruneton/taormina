import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventsPileCardsEffects } from './events-pile-cards.effects';
import * as EventsPileCardsSelectors from './events-pile-cards.selectors';

jest.mock('./events-pile-cards.models', () => {
  return {
    __esModule: true,
    createInitialEventsPileCards: jest.fn(() => []),
  };
});

describe('EventsPileCardsEffects', () => {
  let injector: Injector;
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

  describe('selectFirst$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: EventsPileCardsSelectors.getAllEventsPileCards,
                value: [
                  {
                    id: 'aaaa',
                    cardId: 'EVENT_0',
                  },
                  {
                    id: 'bbbb',
                    cardId: 'EVENT_1',
                  },
                ],
              },
            ],
          }),
        ],
      });
      injector.get(MockStore);
    });

    it('should select the first events pile card', () => {
      actions = hot('-a-|', {
        a: EventsPileCardsActions.selectFirstEventsPileCard(),
      });

      const expected = hot('-a-|', {
        a: EventsPileCardsActions.selectEventsPileCard({
          id: 'aaaa',
        }),
      });

      expect(effects.selectFirst$).toBeObservable(expected);
    });
  });

  describe('removeSelected$', () => {
    beforeEach(() => {
      injector = Injector.create({
        providers: [
          provideMockStore({
            selectors: [
              {
                selector: EventsPileCardsSelectors.getEventsPileCardsSelectedId,
                value: 'aaaa',
              },
            ],
          }),
        ],
      });
      injector.get(MockStore);
    });

    it('should remove the selected events pile card', () => {
      actions = hot('-a----|', {
        a: EventsPileCardsActions.removeSelectedEventsPileCard(),
      });

      const expected = hot('-(ab)-|', {
        a: EventsPileCardsActions.removeEventsPileCard({
          id: 'aaaa',
        }),
        b: EventsPileCardsActions.unselectEventsPileCard(),
      });

      expect(effects.removeSelected$).toBeObservable(expected);
    });
  });
});
