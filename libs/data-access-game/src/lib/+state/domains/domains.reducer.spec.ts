import { DomainsEntity } from './domains.models';
import * as DomainsActions from './domains.actions';
import { State, initialState, reducer } from './domains.reducer';

describe('Domains Reducer', () => {
  const createDomainsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DomainsEntity);

  beforeEach(() => {});

  describe('valid Domains actions', () => {
    it('loadDomainsSuccess should return set the list of known Domains', () => {
      const domains = [
        createDomainsEntity('PRODUCT-AAA'),
        createDomainsEntity('PRODUCT-zzz'),
      ];
      const action = DomainsActions.loadDomainsSuccess({ domains });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
