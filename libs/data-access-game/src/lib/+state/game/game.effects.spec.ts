import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { EventValue, GamePhase } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import * as DomainsCardsActions from '../domains-cards/domains-cards.actions';
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
  let actions: Observable<Action>;
  let effects: GameEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GameEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GameEffects);
  });

  describe('throwDice$', () => {
    it('should dispatch throwProductionDie and throwEventDie', () => {
      actions = hot('-a', { a: GameActions.throwDice() });

      const expected = hot('-(ab)', {
        a: GameActions.throwProductionDie(),
        b: GameActions.throwEventDie(),
      });

      expect(effects.throwDice$).toBeObservable(expected);
    });
  });

  describe('throwProduction$', () => {
    let injector: Injector;

    describe('InitialThrow', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: GameSelectors.getGamePhase,
                  value: GamePhase.InitialThrow,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setProductionDie only when phase is InitialThrow', () => {
        actions = hot('-a-|', { a: GameActions.throwProductionDie() });

        const expected = hot('-a-|', {
          a: GameActions.setProductionDie({ value: 1 }),
        });

        expect(effects.throwProduction$).toBeObservable(expected);
      });
    });

    describe('Not InitialThrow', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: GameSelectors.getGamePhase,
                  value: GamePhase.LoopThrow,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setProductionDie and increaseLandValueForDie when phase is not InitialThrow', () => {
        actions = hot('-a', { a: GameActions.throwProductionDie() });

        const expected = hot('-(ab)', {
          a: GameActions.setProductionDie({ value: 1 }),
          b: DomainsCardsActions.increaseLandValueForDie({ die: 1 }),
        });

        expect(effects.throwProduction$).toBeObservable(expected);
      });
    });
  });

  describe('throwEvent$', () => {
    it('should dispatch setEventDie', () => {
      actions = hot('-a-|', { a: GameActions.throwEventDie() });

      const expected = hot('-a-|', {
        a: GameActions.setEventDie({ value: EventValue.Event }),
      });

      expect(effects.throwEvent$).toBeObservable(expected);
    });
  });
});
