import { DomainColor } from '@taormina/shared-models';

import { createDomainsEntity, DomainsEntity } from './domains.models';
import {
  domainsAdapter,
  DomainsPartialState,
  initialDomainsState,
} from './domains.reducer';
import * as DomainsSelectors from './domains.selectors';

describe('Domains Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDomainsId = (it: DomainsEntity | undefined) => {
    if (it === undefined) return undefined;
    return it['id'];
  };

  let state: DomainsPartialState;

  beforeEach(() => {
    state = {
      domains: domainsAdapter.setAll(
        [
          createDomainsEntity('PRODUCT-AAA', DomainColor.Red),
          createDomainsEntity('PRODUCT-BBB', DomainColor.Blue),
          createDomainsEntity('PRODUCT-CCC', DomainColor.Red),
        ],
        {
          ...initialDomainsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Domains Selectors', () => {
    it('getAllDomains() should return the list of Domains', () => {
      const results = DomainsSelectors.getAllDomains(state);
      const selId = getDomainsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getDomainsSelected() should return the selected Entity', () => {
      const result = DomainsSelectors.getDomainsSelected(state);
      const selId = getDomainsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getDomainsLoaded() should return the current 'loaded' status", () => {
      const result = DomainsSelectors.getDomainsLoaded(state);

      expect(result).toBe(true);
    });

    it("getDomainsError() should return the current 'error' state", () => {
      const result = DomainsSelectors.getDomainsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
