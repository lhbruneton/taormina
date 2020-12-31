import { createAction, props } from '@ngrx/store';
import { EventsPileCardsEntity } from './events-pile-cards.models';

export const initEventsPileCards = createAction('[EventsPileCards Page] Init');

export const loadEventsPileCardsSuccess = createAction(
  '[EventsPileCards/API] Load EventsPileCards Success',
  props<{ eventsPileCards: EventsPileCardsEntity[] }>()
);

export const loadEventsPileCardsFailure = createAction(
  '[EventsPileCards/API] Load EventsPileCards Failure',
  props<{ error: any }>()
);
