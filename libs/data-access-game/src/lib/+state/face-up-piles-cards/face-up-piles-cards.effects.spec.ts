import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, createSelector } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { ID_FACE_UP_ROAD } from '@taormina/shared-constants';
import { Observable } from 'rxjs';

import * as FaceUpPilesCardsActions from './face-up-piles-cards.actions';
import { FaceUpPilesCardsEffects } from './face-up-piles-cards.effects';
import * as FaceUpPilesCardsModels from './face-up-piles-cards.models';
import * as FaceUpPilesCardsSelectors from './face-up-piles-cards.selectors';

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
      jest
        .spyOn(FaceUpPilesCardsModels, 'createInitialFaceUpPilesCards')
        .mockReturnValue([]);
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
      it('should dispatch selectFaceUpPileCard', () => {
        const expectedId = 'AAA';
        jest
          .spyOn(FaceUpPilesCardsSelectors, 'getFirstCardPivotForPile')
          .mockImplementation((pileId: string) =>
            createSelector(
              () => [],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: expectedId,
                  pileId,
                  cardId: 'ROAD_1',
                } as FaceUpPilesCardsModels.FaceUpPilesCardsEntity | undefined)
            )
          );

        actions = hot('-a-|', {
          a: FaceUpPilesCardsActions.selectFirstCardFromFaceUpPile({
            pileId: ID_FACE_UP_ROAD,
          }),
        });

        const expected = hot('-a-|', {
          a: FaceUpPilesCardsActions.selectFaceUpPileCard({ id: expectedId }),
        });

        expect(effects.selectFirst$).toBeObservable(expected);
      });
    });

    describe('KO pivot undefined', () => {
      it('should dispatch setFaceUpPilesCardsError with pivot error', () => {
        jest
          .spyOn(FaceUpPilesCardsSelectors, 'getFirstCardPivotForPile')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_pileId: string) =>
            createSelector(
              () => [],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                undefined as
                  | FaceUpPilesCardsModels.FaceUpPilesCardsEntity
                  | undefined
            )
          );

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
