import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, createSelector } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { ID_AGGLOMERATION_ROAD } from '@taormina/shared-constants';
import { Observable } from 'rxjs';

import * as AgglomerationPilesCardsActions from './agglomeration-piles-cards.actions';
import { AgglomerationPilesCardsEffects } from './agglomeration-piles-cards.effects';
import * as AgglomerationPilesCardsModels from './agglomeration-piles-cards.models';
import * as AgglomerationPilesCardsSelectors from './agglomeration-piles-cards.selectors';

describe('AgglomerationPilesCardsEffects', () => {
  let actions: Observable<Action>;
  let effects: AgglomerationPilesCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AgglomerationPilesCardsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AgglomerationPilesCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      jest
        .spyOn(
          AgglomerationPilesCardsModels,
          'createInitialAgglomerationPilesCards'
        )
        .mockReturnValue([]);
      actions = hot('-a-|', {
        a: AgglomerationPilesCardsActions.initAgglomerationNewGame(),
      });

      const expected = hot('-a-|', {
        a: AgglomerationPilesCardsActions.setAgglomerationPilesCardsInitialized(
          {
            agglomerationPilesCards: [],
          }
        ),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: AgglomerationPilesCardsActions.initAgglomerationSavedGame(),
      });

      const expected = hot('-a-|', {
        a: AgglomerationPilesCardsActions.loadAgglomerationPilesCardsSuccess({
          agglomerationPilesCards: [],
        }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });

  describe('selectFirst$', () => {
    describe('OK', () => {
      it('should dispatch selectAgglomerationPileCard', () => {
        const expectedId = 'AAA';
        jest
          .spyOn(AgglomerationPilesCardsSelectors, 'getFirstCardPivotForPile')
          .mockImplementation((pileId: string) =>
            createSelector(
              () =>
                [] as AgglomerationPilesCardsModels.AgglomerationPilesCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                ({
                  id: expectedId,
                  pileId,
                  cardId: 'ROAD_1',
                } as
                  | AgglomerationPilesCardsModels.AgglomerationPilesCardsEntity
                  | undefined)
            )
          );

        actions = hot('-a-|', {
          a: AgglomerationPilesCardsActions.selectFirstCardFromAgglomerationPile(
            {
              pileId: ID_AGGLOMERATION_ROAD,
            }
          ),
        });

        const expected = hot('-a-|', {
          a: AgglomerationPilesCardsActions.selectAgglomerationPileCard({
            id: expectedId,
          }),
        });

        expect(effects.selectFirst$).toBeObservable(expected);
      });
    });

    describe('KO pivot undefined', () => {
      it('should dispatch setAgglomerationPilesCardsError with pivot error', () => {
        jest
          .spyOn(AgglomerationPilesCardsSelectors, 'getFirstCardPivotForPile')
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .mockImplementation((_pileId: string) =>
            createSelector(
              () =>
                [] as AgglomerationPilesCardsModels.AgglomerationPilesCardsEntity[],
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              (_) =>
                undefined as
                  | AgglomerationPilesCardsModels.AgglomerationPilesCardsEntity
                  | undefined
            )
          );

        actions = hot('-a-|', {
          a: AgglomerationPilesCardsActions.selectFirstCardFromAgglomerationPile(
            {
              pileId: ID_AGGLOMERATION_ROAD,
            }
          ),
        });

        const expected = hot('-a-|', {
          a: AgglomerationPilesCardsActions.setAgglomerationPilesCardsError({
            error: `Can't get first card in empty agglomeration pile.`,
          }),
        });

        expect(effects.selectFirst$).toBeObservable(expected);
      });
    });
  });
});
