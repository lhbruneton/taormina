import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DomainsEffects } from './domains.effects';
import * as DomainsActions from './domains.actions';

describe('DomainsEffects', () => {
  let actions: Observable<any>;
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

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DomainsActions.init() });

      const expected = hot('-a-|', {
        a: DomainsActions.loadDomainsSuccess({ domains: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});