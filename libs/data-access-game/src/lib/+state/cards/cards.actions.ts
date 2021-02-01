import { createAction, props } from '@ngrx/store';
import { CardsEntity } from './cards.models';

export const initCardsNewGame = createAction(
  '[Start Page] Init Cards New Game'
);

export const initCardsSavedGame = createAction(
  '[Start Page] Init Cards Saved Game'
);

export const loadCardsSuccess = createAction(
  '[Cards/API] Load Cards Success',
  props<{ cards: CardsEntity[] }>()
);

export const loadCardsFailure = createAction(
  '[Cards/API] Load Cards Failure',
  props<{ error: any }>()
);

export const setCardsInitialized = createAction(
  '[Cards] Set Cards On Init',
  props<{ cards: CardsEntity[] }>()
);

export const drawCardsFromStockToHand = createAction(
  '[Cards] Draw Cards From Stock To Hand',
  props<{ stockPileId: string; cardsCount: number; handId: string }>()
);
