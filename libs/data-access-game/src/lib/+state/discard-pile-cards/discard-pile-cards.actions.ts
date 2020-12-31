import { createAction, props } from '@ngrx/store';
import { CardsEntity } from '../../model/cards.models';

export const initDiscardPileCards = createAction(
  '[DiscardPileCards Page] Init'
);

export const loadDiscardPileCardsSuccess = createAction(
  '[DiscardPileCards/API] Load DiscardPileCards Success',
  props<{ discardPileCards: CardsEntity[] }>()
);

export const loadDiscardPileCardsFailure = createAction(
  '[DiscardPileCards/API] Load DiscardPileCards Failure',
  props<{ error: any }>()
);
