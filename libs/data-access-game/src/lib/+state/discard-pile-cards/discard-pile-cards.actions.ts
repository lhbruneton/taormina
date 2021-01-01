import { createAction, props } from '@ngrx/store';
import { CardsEntity } from '../cards/cards.models';

export const initDiscardPileCardsNewGame = createAction(
  '[Start Page] Init DiscardPileCards New Game'
);

export const initDiscardPileCardsSavedGame = createAction(
  '[Start Page] Init DiscardPileCards Saved Game'
);

export const loadDiscardPileCardsSuccess = createAction(
  '[DiscardPileCards/API] Load DiscardPileCards Success',
  props<{ discardPileCards: CardsEntity[] }>()
);

export const loadDiscardPileCardsFailure = createAction(
  '[DiscardPileCards/API] Load DiscardPileCards Failure',
  props<{ error: any }>()
);

export const setDiscardPileCardsInitialized = createAction(
  '[DiscardPileCards] Set DiscardPileCards On Init',
  props<{ discardPileCards: CardsEntity[] }>()
);
