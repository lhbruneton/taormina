import { createAction, props } from '@ngrx/store';
import { LandCardsEntity } from '../cards/models/land';

export const initLandsPileCardsNewGame = createAction(
  '[Start Page] Init LandsPileCards New Game'
);

export const initLandsPileCardsSavedGame = createAction(
  '[Start Page] Init LandsPileCards Saved Game'
);

export const loadLandsPileCardsSuccess = createAction(
  '[LandsPileCards/API] Load LandsPileCards Success',
  props<{ landsPileCards: LandCardsEntity[] }>()
);

export const loadLandsPileCardsFailure = createAction(
  '[LandsPileCards/API] Load LandsPileCards Failure',
  props<{ error: any }>()
);

export const setLandsPileCardsInitialized = createAction(
  '[LandsPileCards] Set LandsPileCards On Init',
  props<{ landsPileCards: LandCardsEntity[] }>()
);
