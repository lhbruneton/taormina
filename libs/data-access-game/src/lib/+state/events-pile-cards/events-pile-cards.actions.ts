import { createAction, props } from '@ngrx/store';
import { CardsEntity } from '../../model/cards.models';

export const initEventsPileCardsNewGame = createAction(
  '[Start Page] Init EventsPileCards New Game'
);

export const initEventsPileCardsSavedGame = createAction(
  '[Start Page] Init EventsPileCards Saved Game'
);

export const loadEventsPileCardsSuccess = createAction(
  '[EventsPileCards/API] Load EventsPileCards Success',
  props<{ eventsPileCards: CardsEntity[] }>()
);

export const loadEventsPileCardsFailure = createAction(
  '[EventsPileCards/API] Load EventsPileCards Failure',
  props<{ error: any }>()
);

export const setEventsPileCardsInitialized = createAction(
  '[EventsPileCards] Set EventsPileCards On Init',
  props<{ eventsPileCards: CardsEntity[] }>()
);
