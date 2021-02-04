import { Action } from '@ngrx/store';
import { DomainColor } from '@taormina/shared-models';

import * as DomainsActions from './domains.actions';
import { createDomainsEntity } from './domains.models';
import {
  domainsReducer,
  DomainsState,
  initialDomainsState,
} from './domains.reducer';

describe('Domains Reducer', () => {
  describe('valid Domains actions', () => {
    it('loadDomainsSuccess should set the list of known Domains', () => {
      const domains = [
        createDomainsEntity('PRODUCT-AAA', DomainColor.Red),
        createDomainsEntity('PRODUCT-zzz', DomainColor.Blue),
      ];
      const action = DomainsActions.loadDomainsSuccess({ domains });

      const result: DomainsState = domainsReducer(initialDomainsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = domainsReducer(initialDomainsState, action);

      expect(result).toBe(initialDomainsState);
    });
  });
});
