import { createAction, props } from '@ngrx/store';
import { HandCardsEntity } from './hand-cards.models';

export const initHandCards = createAction('[HandCards Page] Init');

export const loadHandCardsSuccess = createAction(
  '[HandCards/API] Load HandCards Success',
  props<{ handCards: HandCardsEntity[] }>()
);

export const loadHandCardsFailure = createAction(
  '[HandCards/API] Load HandCards Failure',
  props<{ error: any }>()
);
