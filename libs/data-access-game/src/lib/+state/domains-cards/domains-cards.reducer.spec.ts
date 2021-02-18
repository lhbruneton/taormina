import { Action } from '@ngrx/store';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import * as DomainsCardsActions from './domains-cards.actions';
import { createDomainsCardsEntity } from './domains-cards.models';
import {
  domainsCardsReducer,
  DomainsCardsState,
  initialDomainsCardsState,
} from './domains-cards.reducer';

describe('DomainsCards Reducer', () => {
  describe('valid DomainsCards actions', () => {
    it('loadDomainsCardsSuccess should set the list of known DomainsCards', () => {
      const domainsCards = [
        createDomainsCardsEntity(
          'PRODUCT-AAA',
          'A',
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'A',
          0,
          0
        ),
        createDomainsCardsEntity(
          'PRODUCT-zzz',
          'z',
          AGGLOMERATION_CARD_INTERFACE_NAME,
          'z',
          0,
          0
        ),
      ];
      const action = DomainsCardsActions.loadDomainsCardsSuccess({
        domainsCards,
      });

      const result: DomainsCardsState = domainsCardsReducer(
        initialDomainsCardsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = domainsCardsReducer(initialDomainsCardsState, action);

      expect(result).toBe(initialDomainsCardsState);
    });
  });
});
