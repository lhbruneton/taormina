import { DomainCardsEntity } from './domain-cards.models';
import * as DomainCardsActions from './domain-cards.actions';
import { State, initialState, reducer } from './domain-cards.reducer';

describe('DomainCards Reducer', () => {
  const createDomainCardsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as DomainCardsEntity);

  beforeEach(() => {});

  describe('valid DomainCards actions', () => {
    it('loadDomainCardsSuccess should return set the list of known DomainCards', () => {
      const domainCards = [
        createDomainCardsEntity('PRODUCT-AAA'),
        createDomainCardsEntity('PRODUCT-zzz'),
      ];
      const action = DomainCardsActions.loadDomainCardsSuccess({ domainCards });

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
