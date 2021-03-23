import { createAction, props } from '@ngrx/store';
import { LandsPileCardsEntity } from './lands-pile-cards.models';

export const initLandsPileCardsNewGame = createAction(
  '[Start Page] Init LandsPileCards New Game'
);

export const initLandsPileCardsSavedGame = createAction(
  '[Start Page] Init LandsPileCards Saved Game'
);

export const loadLandsPileCardsSuccess = createAction(
  '[LandsPileCards/API] Load LandsPileCards Success',
  props<{ landsPileCards: LandsPileCardsEntity[] }>()
);

export const loadLandsPileCardsFailure = createAction(
  '[LandsPileCards/API] Load LandsPileCards Failure',
  props<{ error: string }>()
);

export const setLandsPileCardsInitialized = createAction(
  '[LandsPileCards] Set LandsPileCards On Init',
  props<{ landsPileCards: LandsPileCardsEntity[] }>()
);

export const setLandsPileCardsError = createAction(
  '[LandsPileCards] Set LandsPileCards Error',
  props<{ error: string }>()
);
