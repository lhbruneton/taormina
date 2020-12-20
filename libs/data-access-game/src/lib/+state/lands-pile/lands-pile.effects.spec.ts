import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { LandsPileEffects } from './lands-pile.effects';
import * as LandsPileActions from './lands-pile.actions';

describe('LandsPileEffects', () => {
  let actions: Observable<any>;
  let effects: LandsPileEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        LandsPileEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(LandsPileEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: LandsPileActions.init() });

      const expected = hot('-a-|', {
        a: LandsPileActions.loadLandsPileSuccess({ landsPile: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
