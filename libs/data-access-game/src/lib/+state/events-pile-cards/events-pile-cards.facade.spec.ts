import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { createCardsEntity } from '../cards/cards.models';
import { EventsPileCardsEffects } from './events-pile-cards.effects';
import { EventsPileCardsFacade } from './events-pile-cards.facade';

import * as EventsPileCardsSelectors from './events-pile-cards.selectors';
import * as EventsPileCardsActions from './events-pile-cards.actions';
import {
  EVENTS_PILE_CARDS_FEATURE_KEY,
  EventsPileCardsState,
  initialEventsPileCardsState,
  eventsPileCardsReducer,
} from './events-pile-cards.reducer';

interface TestSchema {
  eventsPileCards: EventsPileCardsState;
}

describe('EventsPileCardsFacade', () => {
  let facade: EventsPileCardsFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

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
          NxModule.forRoot(),
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
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allEventsPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allEventsPileCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadEventsPileCardsSuccess` to manually update list
     */
    it('allEventsPileCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allEventsPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          EventsPileCardsActions.loadEventsPileCardsSuccess({
            eventsPileCards: [
              createCardsEntity('AAA'),
              createCardsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allEventsPileCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
