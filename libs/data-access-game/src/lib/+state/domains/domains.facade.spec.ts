import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { DomainColor } from '@taormina/shared-models';

import * as DomainsActions from './domains.actions';
import { DomainsEffects } from './domains.effects';
import { DomainsFacade } from './domains.facade';
import { createDomainsEntity } from './domains.models';
import {
  domainsReducer,
  DomainsState,
  DOMAINS_FEATURE_KEY,
} from './domains.reducer';

interface TestSchema {
  domains: DomainsState;
}

describe('DomainsFacade', () => {
  let facade: DomainsFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(DOMAINS_FEATURE_KEY, domainsReducer),
          EffectsModule.forFeature([DomainsEffects]),
        ],
        providers: [DomainsFacade],
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
      facade = TestBed.get(DomainsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allDomains$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.initSavedGame();

        list = await readFirst(facade.allDomains$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadDomainsSuccess` to manually update list
     */
    it('allDomains$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allDomains$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          DomainsActions.loadDomainsSuccess({
            domains: [
              createDomainsEntity('AAA', DomainColor.Red),
              createDomainsEntity('BBB', DomainColor.Blue),
            ],
          })
        );

        list = await readFirst(facade.allDomains$);
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
