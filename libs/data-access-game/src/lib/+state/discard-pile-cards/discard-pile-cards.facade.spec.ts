import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CardsEntity } from '../../model/cards.models';
import { DiscardPileCardsEffects } from './discard-pile-cards.effects';
import { DiscardPileCardsFacade } from './discard-pile-cards.facade';

import * as DiscardPileCardsSelectors from './discard-pile-cards.selectors';
import * as DiscardPileCardsActions from './discard-pile-cards.actions';
import {
  DISCARD_PILE_CARDS_FEATURE_KEY,
  DiscardPileCardsState,
  initialDiscardPileCardsState,
  discardPileCardsReducer,
} from './discard-pile-cards.reducer';

interface TestSchema {
  discardPileCards: DiscardPileCardsState;
}

describe('DiscardPileCardsFacade', () => {
  let facade: DiscardPileCardsFacade;
  let store: Store<TestSchema>;
  const createCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CardsEntity);

  beforeEach(() => {});

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
          NxModule.forRoot(),
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
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDiscardPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allDiscardPileCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDiscardPileCardsSuccess` to manually update list
     */
    it('allDiscardPileCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDiscardPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DiscardPileCardsActions.loadDiscardPileCardsSuccess({
            discardPileCards: [
              createCardsEntity('AAA'),
              createCardsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allDiscardPileCards$);
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
