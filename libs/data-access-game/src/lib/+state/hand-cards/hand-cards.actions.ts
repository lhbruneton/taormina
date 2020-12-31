import { createAction, props } from '@ngrx/store';
import { HandCardsEntity } from './hand-cards.models';

export const initHandCardsNewGame = createAction(
  '[Start Page] Init HandCards New Game'
);

export const initHandCardsSavedGame = createAction(
  '[Start Page] Init HandCards Saved Game'
);

export const loadHandCardsSuccess = createAction(
  '[HandCards/API] Load HandCards Success',
  props<{ handCards: HandCardsEntity[] }>()
);

export const loadHandCardsFailure = createAction(
  '[HandCards/API] Load HandCards Failure',
  props<{ error: any }>()
);

export const setHandCardsInitialized = createAction(
  '[HandCards] Set HandCards On Init',
  props<{ handCards: HandCardsEntity[] }>()
);
