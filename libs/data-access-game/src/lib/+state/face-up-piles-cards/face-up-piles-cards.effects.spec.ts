import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { FaceUpPilesCardsEffects } from './face-up-piles-cards.effects';

jest.mock('./face-up-piles-cards.models', () => {
  return {
    __esModule: true,
    createInitialFaceUpPilesCards: jest.fn(() => []),
  };
});

describe('FaceUpPilesCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: FaceUpPilesCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        FaceUpPilesCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(FaceUpPilesCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: FaceUpPilesCardsActions.initFaceUpNewGame() });

      const expected = hot('-a-|', {
        a: FaceUpPilesCardsActions.setFaceUpPilesCardsInitialized({
          faceUpPilesCards: [],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: FaceUpPilesCardsActions.initFaceUpSavedGame(),
      });

      const expected = hot('-a-|', {
        a: FaceUpPilesCardsActions.loadFaceUpPilesCardsSuccess({
          faceUpPilesCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
