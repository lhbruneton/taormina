import { createAction, props } from '@ngrx/store';
import { LandsPileCardsEntity } from './lands-pile-cards.models';

export const initLandsPileCards = createAction('[LandsPileCards Page] Init');

export const loadLandsPileCardsSuccess = createAction(
  '[LandsPileCards/API] Load LandsPileCards Success',
  props<{ landsPileCards: LandsPileCardsEntity[] }>()
);

export const loadLandsPileCardsFailure = createAction(
  '[LandsPileCards/API] Load LandsPileCards Failure',
  props<{ error: any }>()
);
