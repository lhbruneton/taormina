import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { DomainsEntity } from './domains.models';
import { DomainsEffects } from './domains.effects';
import { DomainsFacade } from './domains.facade';

import * as DomainsSelectors from './domains.selectors';
import * as DomainsActions from './domains.actions';
import {
  DOMAINS_FEATURE_KEY,
  DomainsState,
  initialDomainsState,
  domainsReducer,
} from './domains.reducer';

interface TestSchema {
  domains: DomainsState;
}

describe('DomainsFacade', () => {
  let facade: DomainsFacade;
  let store: Store<TestSchema>;
  const createDomainsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DomainsEntity);

  beforeEach(() => {});

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
            domains: [createDomainsEntity('AAA'), createDomainsEntity('BBB')],
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
