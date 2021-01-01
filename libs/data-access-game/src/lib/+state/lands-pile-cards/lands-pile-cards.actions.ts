import { createAction, props } from '@ngrx/store';
import { CardsEntity } from '../cards/cards.models';

export const initLandsPileCardsNewGame = createAction(
  '[Start Page] Init LandsPileCards New Game'
);

export const initLandsPileCardsSavedGame = createAction(
  '[Start Page] Init LandsPileCards Saved Game'
);

export const loadLandsPileCardsSuccess = createAction(
  '[LandsPileCards/API] Load LandsPileCards Success',
  props<{ landsPileCards: CardsEntity[] }>()
);

export const loadLandsPileCardsFailure = createAction(
  '[LandsPileCards/API] Load LandsPileCards Failure',
  props<{ error: any }>()
);

export const setLandsPileCardsInitialized = createAction(
  '[LandsPileCards] Set LandsPileCards On Init',
  props<{ landsPileCards: CardsEntity[] }>()
);
