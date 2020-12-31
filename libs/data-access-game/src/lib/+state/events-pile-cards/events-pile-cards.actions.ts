import { createAction, props } from '@ngrx/store';
import { CardsEntity } from '../../model/cards.models';

export const initEventsPileCards = createAction('[EventsPileCards Page] Init');

export const loadEventsPileCardsSuccess = createAction(
  '[EventsPileCards/API] Load EventsPileCards Success',
  props<{ eventsPileCards: CardsEntity[] }>()
);

export const loadEventsPileCardsFailure = createAction(
  '[EventsPileCards/API] Load EventsPileCards Failure',
  props<{ error: any }>()
);
