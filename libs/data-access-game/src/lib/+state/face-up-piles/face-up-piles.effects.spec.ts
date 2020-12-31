import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { FaceUpPilesEffects } from './face-up-piles.effects';
import * as FaceUpPilesActions from './face-up-piles.actions';

describe('FaceUpPilesEffects', () => {
  let actions: Observable<any>;
  let effects: FaceUpPilesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FaceUpPilesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(FaceUpPilesEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FaceUpPilesActions.initFaceUpNewGame() });

      const expected = hot('-a-|', {
        a: FaceUpPilesActions.setFaceUpPilesInitialized({ faceUpPiles: [] }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FaceUpPilesActions.initFaceUpSavedGame() });

      const expected = hot('-a-|', {
        a: FaceUpPilesActions.loadFaceUpPilesSuccess({ faceUpPiles: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
