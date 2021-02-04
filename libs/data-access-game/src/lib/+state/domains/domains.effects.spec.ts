import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as DomainsActions from './domains.actions';
import { DomainsEffects } from './domains.effects';

jest.mock('./domains.models', () => {
  return {
    __esModule: true,
    createInitialDomains: jest.fn(() => []),
  };
});

describe('DomainsEffects', () => {
  let actions: Observable<Action>;
  let effects: DomainsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DomainsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(DomainsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DomainsActions.initDomainsNewGame() });

      const expected = hot('-a-|', {
        a: DomainsActions.setDomainsInitialized({ domains: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DomainsActions.initDomainsSavedGame() });

      const expected = hot('-a-|', {
        a: DomainsActions.loadDomainsSuccess({ domains: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
