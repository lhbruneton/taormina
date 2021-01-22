import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { DomainColor, LandType } from '@taormina/shared-models';

import { createLandCardsEntity } from '../cards/models/land';
import * as LandsPileCardsActions from './lands-pile-cards.actions';
import { LandsPileCardsEffects } from './lands-pile-cards.effects';
import { LandsPileCardsFacade } from './lands-pile-cards.facade';
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

  beforeEach(() => {});

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
          NxModule.forRoot(),
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
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allLandsPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allLandsPileCards$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadLandsPileCardsSuccess` to manually update list
     */
    it('allLandsPileCards$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allLandsPileCards$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          LandsPileCardsActions.loadLandsPileCardsSuccess({
            landsPileCards: [
              createLandCardsEntity(
                'AAA',
                LandType.ClayPit,
                0,
                DomainColor.Red
              ),
              createLandCardsEntity('BBB', LandType.Field, 3, DomainColor.Blue),
            ],
          })
        );

        list = await readFirst(facade.allLandsPileCards$);
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
