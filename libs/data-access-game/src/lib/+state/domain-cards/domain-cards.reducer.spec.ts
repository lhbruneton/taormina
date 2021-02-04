import { Action } from '@ngrx/store';
import * as DomainCardsActions from './domain-cards.actions';
import { createDomainCardsEntity } from './domain-cards.models';
import {
  domainCardsReducer,
  DomainCardsState,
  initialDomainCardsState,
} from './domain-cards.reducer';

describe('DomainCards Reducer', () => {
  describe('valid DomainCards actions', () => {
    it('loadDomainCardsSuccess should set the list of known DomainCards', () => {
      const domainCards = [
        createDomainCardsEntity('PRODUCT-AAA', 'A', 'A', 0, 0),
        createDomainCardsEntity('PRODUCT-zzz', 'z', 'z', 0, 0),
      ];
      const action = DomainCardsActions.loadDomainCardsSuccess({ domainCards });

      const result: DomainCardsState = domainCardsReducer(
        initialDomainCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = domainCardsReducer(initialDomainCardsState, action);

      expect(result).toBe(initialDomainCardsState);
    });
  });
});
