import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { DomainColor } from '@taormina/shared-models';
import { Observable } from 'rxjs';

import { createCardsEntity } from '../cards/cards.models';
import * as CardsSelectors from '../cards/cards.selectors';
import { createDomainsEntity } from '../domains/domains.models';
import * as DomainsSelectors from '../domains/domains.selectors';
import * as DomainCardsActions from './domain-cards.actions';
import { DomainCardsEffects } from './domain-cards.effects';

jest.mock('./domain-cards.models', () => {
  return {
    __esModule: true,
    createInitialDomainCards: jest.fn((domain, cards) =>
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
                createDomainsEntity('DOMAIN-AAA', DomainColor.Red),
                createDomainsEntity('DOMAIN-BBB', DomainColor.Blue),
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
