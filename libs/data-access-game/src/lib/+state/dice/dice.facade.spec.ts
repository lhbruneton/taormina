import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DiceEntity } from './dice.models';
import { DiceEffects } from './dice.effects';
import { DiceFacade } from './dice.facade';

import * as DiceSelectors from './dice.selectors';
import * as DiceActions from './dice.actions';
import {
  DICE_FEATURE_KEY,
  DiceState,
  initialDiceState,
  diceReducer,
} from './dice.reducer';

interface TestSchema {
  dice: DiceState;
}

describe('DiceFacade', () => {
  let facade: DiceFacade;
  let store: Store<TestSchema>;
  const createDiceEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DiceEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DICE_FEATURE_KEY, diceReducer),
          EffectsModule.forFeature([DiceEffects]),
        ],
        providers: [DiceFacade],
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
      facade = TestBed.get(DiceFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDice$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allDice$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDiceSuccess` to manually update list
     */
    it('allDice$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDice$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DiceActions.loadDiceSuccess({
            dice: [createDiceEntity('AAA'), createDiceEntity('BBB')],
          })
        );

        list = await readFirst(facade.allDice$);
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
