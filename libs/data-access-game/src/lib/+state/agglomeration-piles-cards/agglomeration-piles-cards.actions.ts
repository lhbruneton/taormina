import { createAction, props } from '@ngrx/store';
import { AgglomerationPilesCardsEntity } from './agglomeration-piles-cards.models';

export const initAgglomerationNewGame = createAction(
  '[Start Page] Init AgglomerationPilesCards New Game'
);

export const initAgglomerationSavedGame = createAction(
  '[Start Page] Init AgglomerationPilesCards Saved Game'
);

export const loadAgglomerationPilesCardsSuccess = createAction(
  '[AgglomerationPilesCards/API] Load AgglomerationPilesCards Success',
  props<{ agglomerationPilesCards: AgglomerationPilesCardsEntity[] }>()
);

export const loadAgglomerationPilesCardsFailure = createAction(
  '[AgglomerationPilesCards/API] Load AgglomerationPilesCards Failure',
  props<{ error: string }>()
);

export const setAgglomerationPilesCardsInitialized = createAction(
  '[AgglomerationPilesCards] Set AgglomerationPilesCards On Init',
  props<{ agglomerationPilesCards: AgglomerationPilesCardsEntity[] }>()
);

export const removeAgglomerationPileCard = createAction(
  '[AgglomerationPilesCards] Remove AgglomerationPileCard',
  props<{ id: string }>()
);

export const selectFirstCardFromAgglomerationPile = createAction(
  '[AgglomerationPilesCards] Select FirstCardFromAgglomerationPile',
  props<{ pileId: string }>()
);

export const selectAgglomerationPileCard = createAction(
  '[AgglomerationPilesCards] Select Agglomeration Pile Card',
  props<{ id: string }>()
);

export const unselectAgglomerationPileCard = createAction(
  '[AgglomerationPilesCards] Unselect Agglomeration Pile Card'
);

export const setAgglomerationPilesCardsError = createAction(
  '[AgglomerationPilesCards] Set AgglomerationPilesCards Error',
  props<{ error: string }>()
);
