import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as FaceUpPilesActions from './face-up-piles.actions';
import { FaceUpPilesEffects } from './face-up-piles.effects';

jest.mock('../cards/models/agglomeration', () => {
  return {
    __esModule: true,
    createInitialAgglomerationCards: jest.fn(() => []),
  };
});

describe('FaceUpPilesEffects', () => {
  let actions: Observable<Action>;
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
        a: FaceUpPilesActions.setFaceUpPilesInitialized({
          agglomerationCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FaceUpPilesActions.initFaceUpSavedGame() });

      const expected = hot('-a-|', {
        a: FaceUpPilesActions.loadFaceUpPilesSuccess({
          agglomerationCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
