import { createAction, props } from '@ngrx/store';
import { DomainCardsEntity } from './domain-cards.models';

export const initDomainCardsNewGame = createAction(
  '[Start Page] Init DomainCards New Game'
);

export const initDomainCardsSavedGame = createAction(
  '[Start Page] Init DomainCards Saved Game'
);

export const loadDomainCardsSuccess = createAction(
  '[DomainCards/API] Load DomainCards Success',
  props<{ domainCards: DomainCardsEntity[] }>()
);

export const loadDomainCardsFailure = createAction(
  '[DomainCards/API] Load DomainCards Failure',
  props<{ error: unknown }>()
);

export const setDomainCardsInitialized = createAction(
  '[DomainCards] Set DomainCards On Init',
  props<{ domainCards: DomainCardsEntity[] }>()
);
