import { createAction, props } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { HandsCardsEntity } from './hands-cards.models';

export const initHandsCardsNewGame = createAction(
  '[Start Page] Init HandsCards New Game'
);

export const initHandsCardsSavedGame = createAction(
  '[Start Page] Init HandsCards Saved Game'
);

export const loadHandsCardsSuccess = createAction(
  '[HandsCards/API] Load HandsCards Success',
  props<{ handsCards: HandsCardsEntity[] }>()
);

export const loadHandsCardsFailure = createAction(
  '[HandsCards/API] Load HandsCards Failure',
  props<{ error: unknown }>()
);

export const setHandsCardsInitialized = createAction(
  '[HandsCards] Set HandsCards On Init',
  props<{ handsCards: HandsCardsEntity[] }>()
);

export const addCardsToHand = createAction(
  '[HandsCards] Add Cards To Hand',
  props<{
    handId: string;
    cards: Array<{
      type:
        | typeof ACTION_CARD_INTERFACE_NAME
        | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
      id: string;
    }>;
  }>()
);

export const addHandsCards = createAction(
  '[HandsCards] Add HandsCards',
  props<{ handsCards: HandsCardsEntity[] }>()
);
