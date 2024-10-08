/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import { DiscardPileCardsEffects } from './discard-pile-cards.effects';
import { DiscardPileCardsFacade } from './discard-pile-cards.facade';
import { createDiscardPileCardsEntity } from './discard-pile-cards.models';
import {
  discardPileCardsReducer,
  DiscardPileCardsState,
  DISCARD_PILE_CARDS_FEATURE_KEY,
} from './discard-pile-cards.reducer';

interface TestSchema {
  discardPileCards: DiscardPileCardsState;
}

describe('DiscardPileCardsFacade', () => {
  let facade: DiscardPileCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            DISCARD_PILE_CARDS_FEATURE_KEY,
            discardPileCardsReducer
          ),
          EffectsModule.forFeature([DiscardPileCardsEffects]),
        ],
        providers: [DiscardPileCardsFacade],
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
      facade = TestBed.get(DiscardPileCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allDiscardPileCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.initSavedGame();

      list = await firstValueFrom(facade.allDiscardPileCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDiscardPileCardsSuccess` to manually update list
     */
    it('allDiscardPileCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allDiscardPileCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DiscardPileCardsActions.loadDiscardPileCardsSuccess({
          discardPileCards: [
            createDiscardPileCardsEntity('AAA', 'TYPE-A', 'A'),
            createDiscardPileCardsEntity('BBB', 'TYPE-B', 'B'),
          ],
        })
      );

      list = await firstValueFrom(facade.allDiscardPileCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
