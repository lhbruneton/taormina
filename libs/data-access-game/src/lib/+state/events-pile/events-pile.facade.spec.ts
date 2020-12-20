import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { EventsPileEntity } from './events-pile.models';
import { EventsPileEffects } from './events-pile.effects';
import { EventsPileFacade } from './events-pile.facade';

import * as EventsPileSelectors from './events-pile.selectors';
import * as EventsPileActions from './events-pile.actions';
import {
  EVENTS_PILE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './events-pile.reducer';

interface TestSchema {
  eventsPile: State;
}

describe('EventsPileFacade', () => {
  let facade: EventsPileFacade;
  let store: Store<TestSchema>;
  const createEventsPileEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventsPileEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(EVENTS_PILE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([EventsPileEffects]),
        ],
        providers: [EventsPileFacade],
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
      facade = TestBed.get(EventsPileFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allEventsPile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allEventsPile$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadEventsPileSuccess` to manually update list
     */
    it('allEventsPile$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allEventsPile$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          EventsPileActions.loadEventsPileSuccess({
            eventsPile: [
              createEventsPileEntity('AAA'),
              createEventsPileEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allEventsPile$);
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
