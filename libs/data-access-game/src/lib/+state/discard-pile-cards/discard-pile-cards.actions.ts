import { createAction, props } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { DiscardPileCardsEntity } from './discard-pile-cards.models';

export const initDiscardPileCardsNewGame = createAction(
  '[Start Page] Init DiscardPileCards New Game'
);

export const initDiscardPileCardsSavedGame = createAction(
  '[Start Page] Init DiscardPileCards Saved Game'
);

export const loadDiscardPileCardsSuccess = createAction(
  '[DiscardPileCards/API] Load DiscardPileCards Success',
  props<{ discardPileCards: DiscardPileCardsEntity[] }>()
);

export const loadDiscardPileCardsFailure = createAction(
  '[DiscardPileCards/API] Load DiscardPileCards Failure',
  props<{ error: string }>()
);

export const setDiscardPileCardsInitialized = createAction(
  '[DiscardPileCards] Set DiscardPileCards On Init',
  props<{ discardPileCards: DiscardPileCardsEntity[] }>()
);

export const setDiscardPileCardsError = createAction(
  '[DiscardPileCards] Set DiscardPileCards Error',
  props<{ error: string }>()
);

export const addCardToDiscardPile = createAction(
  '[DiscardPileCards] Add Card To Discard Pile',
  props<{
    card: {
      type:
        | typeof ACTION_CARD_INTERFACE_NAME
        | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
      id: string;
    };
  }>()
);

export const addDiscardPileCard = createAction(
  '[DiscardPileCards] Add DiscardPileCard',
  props<{ discardPileCard: DiscardPileCardsEntity }>()
);
