import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { ID_FACE_UP_ROAD } from '@taormina/shared-constants';
import { Observable } from 'rxjs';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { FaceUpPilesCardsEffects } from './face-up-piles-cards.effects';
import * as FaceUpPilesCardsSelectors from './face-up-piles-cards.selectors';

jest.mock('./face-up-piles-cards.models', () => {
  return {
    __esModule: true,
    createInitialFaceUpPilesCards: jest.fn(() => []),
  };
});

describe('FaceUpPilesCardsEffects', () => {
  let injector: Injector;
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

  describe('selectFirst$', () => {
    describe('OK', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: FaceUpPilesCardsSelectors.getFirstCardPivotForPile,
                  value: {
                    id: 'AAA',
                    pileId: ID_FACE_UP_ROAD,
                    cardId: 'ROAD_1',
                  },
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch selectFaceUpPileCard', () => {
        actions = hot('-a-|', {
          a: FaceUpPilesCardsActions.selectFirstCardFromFaceUpPile({
            pileId: ID_FACE_UP_ROAD,
          }),
        });

        const expected = hot('-a-|', {
          a: FaceUpPilesCardsActions.selectFaceUpPileCard({ id: 'AAA' }),
        });

        expect(effects.selectFirst$).toBeObservable(expected);
      });
    });

    describe('KO pivot undefined', () => {
      beforeEach(() => {
        injector = Injector.create({
          providers: [
            provideMockStore({
              selectors: [
                {
                  selector: FaceUpPilesCardsSelectors.getFirstCardPivotForPile,
                  value: undefined,
                },
              ],
            }),
          ],
        });
        injector.get(MockStore);
      });

      it('should dispatch setFaceUpPilesCardsError with pivot error', () => {
        actions = hot('-a-|', {
          a: FaceUpPilesCardsActions.selectFirstCardFromFaceUpPile({
            pileId: ID_FACE_UP_ROAD,
          }),
        });

        const expected = hot('-a-|', {
          a: FaceUpPilesCardsActions.setFaceUpPilesCardsError({
            error: `Can't get first card in empty face up pile.`,
          }),
        });

        expect(effects.selectFirst$).toBeObservable(expected);
      });
    });
  });
});
