/* eslint-disable no-magic-numbers */
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import * as EventsPileCardsActions from './events-pile-cards.actions';
import { EventsPileCardsEffects } from './events-pile-cards.effects';
import { EventsPileCardsFacade } from './events-pile-cards.facade';
import { createEventsPileCardsEntity } from './events-pile-cards.models';
import {
  eventsPileCardsReducer,
  EventsPileCardsState,
  EVENTS_PILE_CARDS_FEATURE_KEY,
} from './events-pile-cards.reducer';

interface TestSchema {
  eventsPileCards: EventsPileCardsState;
}

describe('EventsPileCardsFacade', () => {
  let facade: EventsPileCardsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            EVENTS_PILE_CARDS_FEATURE_KEY,
            eventsPileCardsReducer
          ),
          EffectsModule.forFeature([EventsPileCardsEffects]),
        ],
        providers: [EventsPileCardsFacade],
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
      facade = TestBed.get(EventsPileCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await firstValueFrom(facade.allEventsPileCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.initSavedGame();

      list = await firstValueFrom(facade.allEventsPileCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadEventsPileCardsSuccess` to manually update list
     */
    it('allEventsPileCards$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allEventsPileCards$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        EventsPileCardsActions.loadEventsPileCardsSuccess({
          eventsPileCards: [
            createEventsPileCardsEntity('AAA', 'A'),
            createEventsPileCardsEntity('BBB', 'B'),
          ],
        })
      );

      list = await firstValueFrom(facade.allEventsPileCards$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
