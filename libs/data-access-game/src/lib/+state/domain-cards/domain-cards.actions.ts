import { createAction, props } from '@ngrx/store';
import { DomainCardsEntity } from './domain-cards.models';

export const initDomainCards = createAction('[DomainCards Page] Init');

export const loadDomainCardsSuccess = createAction(
  '[DomainCards/API] Load DomainCards Success',
  props<{ domainCards: DomainCardsEntity[] }>()
);

export const loadDomainCardsFailure = createAction(
  '[DomainCards/API] Load DomainCards Failure',
  props<{ error: any }>()
);
