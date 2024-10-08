/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { firstValueFrom } from 'rxjs';

import * as HandsCardsActions from './hands-cards.actions';
import { HandsCardsEffects } from './hands-cards.effects';
import { HandsCardsFacade } from './hands-cards.facade';
import { createHandsCardsEntity } from './hands-cards.models';
import {
  handsCardsReducer,
  HandsCardsState,
  HANDS_CARDS_FEATURE_KEY,
} from './hands-cards.reducer';

interface TestSchema {
  handsCards: HandsCardsState;
}

describe('HandsCardsFacade', () => {
  let facade: HandsCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HANDS_CARDS_FEATURE_KEY, handsCardsReducer),
          EffectsModule.forFeature([HandsCardsEffects]),
        ],
        providers: [HandsCardsFacade],
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
      facade = TestBed.get(HandsCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allHandsCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.initSavedGame();

      list = await firstValueFrom(facade.allHandsCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadHandsCardsSuccess` to manually update list
     */
    it('allHandsCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allHandsCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        HandsCardsActions.loadHandsCardsSuccess({
          handsCards: [
            createHandsCardsEntity('AAA', 'A', ACTION_CARD_INTERFACE_NAME, 'A'),
            createHandsCardsEntity(
              'BBB',
              'B',
              DEVELOPMENT_CARD_INTERFACE_NAME,
              'B'
            ),
          ],
        })
      );

      list = await firstValueFrom(facade.allHandsCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
