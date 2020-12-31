import { createAction, props } from '@ngrx/store';
import { CardsEntity } from '../../model/cards.models';

export const initLandsPileCards = createAction('[LandsPileCards Page] Init');

export const loadLandsPileCardsSuccess = createAction(
  '[LandsPileCards/API] Load LandsPileCards Success',
  props<{ landsPileCards: CardsEntity[] }>()
);

export const loadLandsPileCardsFailure = createAction(
  '[LandsPileCards/API] Load LandsPileCards Failure',
  props<{ error: any }>()
);
