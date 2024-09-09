import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { EventValue } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as GameActions from './game.actions';
import { GameEffects } from './game.effects';
import * as GameSelectors from './game.selectors';

jest.mock('@taormina/shared-utils', () => {
  return {
    __esModule: true,
    getRandomEventDieValue: jest.fn(() => {
      return EventValue.Event;
    }),
    getRandomProductionDieValue: jest.fn(() => {
      return 1;
    }),
  };
});

describe('GameEffects', () => {
  let injector: Injector;
  let actions: Observable<Action>;
  let effects: GameEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GameEffects);
  });

  describe('throwDice$', () => {
    it('should dispatch throwProductionDie and throwEventDie', () => {
      actions = hot('-a----|', { a: GameActions.throwDice() });

      const expected = hot('-(ab)-|', {
        a: GameActions.throwEventDie(),
        b: GameActions.throwProductionDie(),
      });

      expect(effects.throwDice$).toBeObservable(expected);
    });
  });

  describe('throwProduction$', () => {
    describe('when nextProductionDie is defined', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: GameSelectors.getGameNextProductionDie,
                  value: 3,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch setProductionDie
          with undefined then nextProductionDie value
          and reset nextProductionDie`, () => {
        actions = hot('-a-----|', { a: GameActions.throwProductionDie() });

        const expected = hot('-(abc)-|', {
          a: GameActions.setProductionDie({ value: undefined }),
          b: GameActions.setProductionDie({ value: 3 }),
          c: GameActions.setNextProductionDie({ value: undefined }),
        });

        expect(effects.throwProduction$).toBeObservable(expected);
      });
    });

    describe('when nextProductionDie is undefined', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: GameSelectors.getGameNextProductionDie,
                  value: undefined,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it(`should dispatch setProductionDie
          with undefined then mocked random value
          and reset nextProductionDie`, () => {
        actions = hot('-a-----|', { a: GameActions.throwProductionDie() });

        const expected = hot('-(abc)-|', {
          a: GameActions.setProductionDie({ value: undefined }),
          b: GameActions.setProductionDie({ value: 1 }),
          c: GameActions.setNextProductionDie({ value: undefined }),
        });

        expect(effects.throwProduction$).toBeObservable(expected);
      });
    });
  });

  describe('throwEvent$', () => {
    it('should dispatch setEventDie with undefined then mocked random value', () => {
      actions = hot('-a----|', { a: GameActions.throwEventDie() });

      const expected = hot('-(ab)-|', {
        a: GameActions.setEventDie({ value: undefined }),
        b: GameActions.setEventDie({ value: EventValue.Event }),
      });

      expect(effects.throwEvent$).toBeObservable(expected);
    });
  });
});
