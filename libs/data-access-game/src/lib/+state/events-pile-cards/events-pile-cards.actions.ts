import { createAction, props } from '@ngrx/store';
import { EventsPileCardsEntity } from './events-pile-cards.models';

export const initEventsPileCardsNewGame = createAction(
  '[Start Page] Init EventsPileCards New Game'
);

export const initEventsPileCardsSavedGame = createAction(
  '[Start Page] Init EventsPileCards Saved Game'
);

export const loadEventsPileCardsSuccess = createAction(
  '[EventsPileCards/API] Load EventsPileCards Success',
  props<{ eventsPileCards: EventsPileCardsEntity[] }>()
);

export const loadEventsPileCardsFailure = createAction(
  '[EventsPileCards/API] Load EventsPileCards Failure',
  props<{ error: string }>()
);

export const resetEventsPile = createAction('[Game Rules] Reset Events Pile');

export const selectFirstEventsPileCard = createAction(
  '[EventsPileCards] Select First Events Pile Card'
);

export const removeSelectedEventsPileCard = createAction(
  '[EventsPileCards] Remove Selected Events Pile Card'
);

export const setEntitiesSelectFirstEventsPileCards = createAction(
  '[EventsPileCards] Set Entities Select First EventsPileCards',
  props<{ eventsPileCards: EventsPileCardsEntity[] }>()
);

export const setEntitiesInitializedEventsPileCards = createAction(
  '[EventsPileCards] Set EventsPileCards Initialized Status',
  props<{ eventsPileCards: EventsPileCardsEntity[] }>()
);

export const setEventsPileCardsError = createAction(
  '[EventsPileCards] Set EventsPileCards Error',
  props<{ error: string }>()
);

export const selectEventsPileCard = createAction(
  '[EventsPileCards] Select Events Pile Card',
  props<{ id: string }>()
);

export const unselectEventsPileCard = createAction(
  '[EventsPileCards] Unselect Events Pile Card'
);

export const removeEventsPileCard = createAction(
  '[EventsPileCards] Remove Events Pile Card',
  props<{ id: string }>()
);
