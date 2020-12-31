import { DomainsEntity } from './domains.models';
import {
  DomainsState,
  domainsAdapter,
  initialDomainsState,
} from './domains.reducer';
import * as DomainsSelectors from './domains.selectors';

describe('Domains Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getDomainsId = (it) => it['id'];
  const createDomainsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DomainsEntity);

  let state;

  beforeEach(() => {
    state = {
      domains: domainsAdapter.setAll(
        [
          createDomainsEntity('PRODUCT-AAA'),
          createDomainsEntity('PRODUCT-BBB'),
          createDomainsEntity('PRODUCT-CCC'),
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

    it('getSelected() should return the selected Entity', () => {
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
