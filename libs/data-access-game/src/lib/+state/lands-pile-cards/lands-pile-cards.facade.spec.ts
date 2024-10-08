/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { LandsPileCardsEffects } from './lands-pile-cards.effects';
import { LandsPileCardsFacade } from './lands-pile-cards.facade';
import { createLandsPileCardsEntity } from './lands-pile-cards.models';
import {
  landsPileCardsReducer,
  LandsPileCardsState,
  LANDS_PILE_CARDS_FEATURE_KEY,
} from './lands-pile-cards.reducer';

interface TestSchema {
  landsPileCards: LandsPileCardsState;
}

describe('LandsPileCardsFacade', () => {
  let facade: LandsPileCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            LANDS_PILE_CARDS_FEATURE_KEY,
            landsPileCardsReducer
          ),
          EffectsModule.forFeature([LandsPileCardsEffects]),
        ],
        providers: [LandsPileCardsFacade],
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

      store = TestBed.get(Store);
      facade = TestBed.get(LandsPileCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allLandsPileCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.initSavedGame();

      list = await firstValueFrom(facade.allLandsPileCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadLandsPileCardsSuccess` to manually update list
     */
    it('allLandsPileCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allLandsPileCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        LandsPileCardsActions.loadLandsPileCardsSuccess({
          landsPileCards: [
            createLandsPileCardsEntity('AAA', 'A'),
            createLandsPileCardsEntity('BBB', 'B'),
          ],
        })
      );

      list = await firstValueFrom(facade.allLandsPileCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
