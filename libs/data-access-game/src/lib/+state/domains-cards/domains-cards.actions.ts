import { createAction, props } from '@ngrx/store';
import { DomainsCardsEntity } from './domains-cards.models';

export const initDomainsCardsNewGame = createAction(
  '[Start Page] Init DomainsCards New Game'
);

export const initDomainsCardsSavedGame = createAction(
  '[Start Page] Init DomainsCards Saved Game'
);

export const loadDomainsCardsSuccess = createAction(
  '[DomainsCards/API] Load DomainsCards Success',
  props<{ domainsCards: DomainsCardsEntity[] }>()
);

export const loadDomainsCardsFailure = createAction(
  '[DomainsCards/API] Load DomainsCards Failure',
  props<{ error: unknown }>()
);

export const setDomainsCardsInitialized = createAction(
  '[DomainsCards] Set DomainsCards On Init',
  props<{ domainsCards: DomainsCardsEntity[] }>()
);
