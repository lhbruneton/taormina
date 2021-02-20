import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { DiceId, EventValue } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as DomainsCardsActions from '../domains-cards/domains-cards.actions';
import * as DiceActions from './dice.actions';
import { DiceEffects } from './dice.effects';

jest.mock('./dice.models', () => {
  return {
    __esModule: true,
    createRandomDice: jest.fn(() => {
      const resource = { id: DiceId.Resource, value: 1 };
      const event = { id: DiceId.Event, value: EventValue.Event };
      return { resource, event };
    }),
  };
});

describe('DiceEffects', () => {
  let actions: Observable<Action>;
  let effects: DiceEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DiceEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DiceEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiceActions.initDiceNewGame() });

      const expected = hot('-a-|', {
        a: DiceActions.setDiceInitialized({
          dice: [
            { id: DiceId.Resource, value: 1 },
            { id: DiceId.Event, value: EventValue.Event },
          ],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DiceActions.initDiceSavedGame() });

      const expected = hot('-a-|', {
        a: DiceActions.loadDiceSuccess({ dice: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('throw$', () => {
    it('should work', () => {
      actions = hot('-a', { a: DiceActions.throwDice() });

      const expected = hot('-(ab)', {
        a: DiceActions.upsertDice({
          dice: [
            { id: DiceId.Resource, value: 1 },
            { id: DiceId.Event, value: EventValue.Event },
          ],
        }),
        b: DomainsCardsActions.increaseLandValueForDie({ die: 1 }),
      });

      expect(effects.throw$).toBeObservable(expected);
    });
  });
});
