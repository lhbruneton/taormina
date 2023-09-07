/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as AgglomerationPilesCardsActions from './agglomeration-piles-cards.actions';
import { AgglomerationPilesCardsEffects } from './agglomeration-piles-cards.effects';
import { AgglomerationPilesCardsFacade } from './agglomeration-piles-cards.facade';
import { createAgglomerationPilesCardsEntity } from './agglomeration-piles-cards.models';
import {
  agglomerationPilesCardsReducer,
  AgglomerationPilesCardsState,
  AGGLOMERATION_PILES_CARDS_FEATURE_KEY,
} from './agglomeration-piles-cards.reducer';

interface TestSchema {
  agglomerationPilesCards: AgglomerationPilesCardsState;
}

describe('AgglomerationPilesCardsFacade', () => {
  let facade: AgglomerationPilesCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            AGGLOMERATION_PILES_CARDS_FEATURE_KEY,
            agglomerationPilesCardsReducer
          ),
          EffectsModule.forFeature([AgglomerationPilesCardsEffects]),
        ],
        providers: [AgglomerationPilesCardsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AgglomerationPilesCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allAgglomerationPilesCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.initSavedGame();

      list = await firstValueFrom(facade.allAgglomerationPilesCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAgglomerationPilesCardsSuccess` to manually update list
     */
    it('allAgglomerationPilesCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allAgglomerationPilesCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AgglomerationPilesCardsActions.loadAgglomerationPilesCardsSuccess({
          agglomerationPilesCards: [
            createAgglomerationPilesCardsEntity('AAA', 'A', 'A'),
            createAgglomerationPilesCardsEntity('BBB', 'B', 'B'),
          ],
        })
      );

      list = await firstValueFrom(facade.allAgglomerationPilesCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
