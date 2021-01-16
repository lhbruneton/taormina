import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import * as CardsSelectors from '../cards/cards.selectors';
import * as DomainsSelectors from '../domains/domains.selectors';

import { DomainCardsEffects } from './domain-cards.effects';
import * as DomainCardsActions from './domain-cards.actions';
import { createCardsEntity } from '../cards/cards.models';
import { createDomainsEntity } from '../domains/domains.models';

jest.mock('./domain-cards.models', () => {
  return {
    __esModule: true,
    createNewDomainCards: jest.fn((domain, cards) =>
      cards.map((card) => {
        return {
          id: `${domain.id}-${card.id}`,
          domainId: domain.id,
          cardId: card.id,
          col: 0,
          row: 0,
        };
      })
    ),
  };
});

describe('DomainCardsEffects', () => {
  let actions: Observable<any>;
  let effects: DomainCardsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DomainCardsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore({
          selectors: [
            {
              selector: CardsSelectors.getAllCards,
              value: [
                createCardsEntity('CARD-AAA'),
                createCardsEntity('CARD-BBB'),
              ],
            },
            {
              selector: DomainsSelectors.getAllDomains,
              value: [
                createDomainsEntity('DOMAIN-AAA'),
                createDomainsEntity('DOMAIN-BBB'),
              ],
            },
          ],
        }),
      ],
    });

    effects = TestBed.get(DomainCardsEffects);
  });

  describe('initNewGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DomainCardsActions.initDomainCardsNewGame() });

      const expected = hot('-a-|', {
        a: DomainCardsActions.setDomainCardsInitialized({
          domainCards: [
            {
              id: 'DOMAIN-AAA-CARD-AAA',
              domainId: 'DOMAIN-AAA',
              cardId: 'CARD-AAA',
              col: 0,
              row: 0,
            },
            {
              id: 'DOMAIN-AAA-CARD-BBB',
              domainId: 'DOMAIN-AAA',
              cardId: 'CARD-BBB',
              col: 0,
              row: 0,
            },
            {
              id: 'DOMAIN-BBB-CARD-AAA',
              domainId: 'DOMAIN-BBB',
              cardId: 'CARD-AAA',
              col: 0,
              row: 0,
            },
            {
              id: 'DOMAIN-BBB-CARD-BBB',
              domainId: 'DOMAIN-BBB',
              cardId: 'CARD-BBB',
              col: 0,
              row: 0,
            },
          ],
        }),
      });

      expect(effects.initNewGame$).toBeObservable(expected);
    });
  });

  describe('initSavedGame$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: DomainCardsActions.initDomainCardsSavedGame(),
      });

      const expected = hot('-a-|', {
        a: DomainCardsActions.loadDomainCardsSuccess({ domainCards: [] }),
      });

      expect(effects.initSavedGame$).toBeObservable(expected);
    });
  });
});
