import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { HandCardsEntity } from './hand-cards.models';
import { HandCardsEffects } from './hand-cards.effects';
import { HandCardsFacade } from './hand-cards.facade';

import * as HandCardsSelectors from './hand-cards.selectors';
import * as HandCardsActions from './hand-cards.actions';
import {
  HAND_CARDS_FEATURE_KEY,
  HandCardsState,
  initialHandCardsState,
  handCardsReducer,
} from './hand-cards.reducer';

interface TestSchema {
  handCards: HandCardsState;
}

describe('HandCardsFacade', () => {
  let facade: HandCardsFacade;
  let store: Store<TestSchema>;
  const createHandCardsEntity = (id: string, handId = '', cardId = '') =>
    ({
      id,
      handId: handId || `handId-${id}`,
      cardId: cardId || `cardId-${id}`,
    } as HandCardsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HAND_CARDS_FEATURE_KEY, handCardsReducer),
          EffectsModule.forFeature([HandCardsEffects]),
        ],
        providers: [HandCardsFacade],
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
      facade = TestBed.get(HandCardsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allHandCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allHandCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadHandCardsSuccess` to manually update list
     */
    it('allHandCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allHandCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          HandCardsActions.loadHandCardsSuccess({
            handCards: [
              createHandCardsEntity('AAA'),
              createHandCardsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allHandCards$);
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
