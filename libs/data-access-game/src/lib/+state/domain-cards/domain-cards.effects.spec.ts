import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DomainCardsEffects } from './domain-cards.effects';
import * as DomainCardsActions from './domain-cards.actions';

describe('DomainCardsEffects', () => {
  let actions: Observable<any>;
  let effects: DomainCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DomainCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DomainCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DomainCardsActions.initDomainCardsNewGame() });

      const expected = hot('-a-|', {
        a: DomainCardsActions.setDomainCardsInitialized({ domainCards: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: DomainCardsActions.initDomainCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: DomainCardsActions.loadDomainCardsSuccess({ domainCards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
