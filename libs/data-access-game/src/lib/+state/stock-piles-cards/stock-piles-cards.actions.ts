import { createAction, props } from '@ngrx/store';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { StockPilesCardsEntity } from './stock-piles-cards.models';

export const initStockPilesCardsNewGame = createAction(
  '[Start Page] Init StockPilesCards New Game'
);

export const initStockPilesCardsSavedGame = createAction(
  '[Start Page] Init StockPilesCards Saved Game'
);

export const loadStockPilesCardsSuccess = createAction(
  '[StockPilesCards/API] Load StockPilesCards Success',
  props<{ stockPilesCards: StockPilesCardsEntity[] }>()
);

export const loadStockPilesCardsFailure = createAction(
  '[StockPilesCards/API] Load StockPilesCards Failure',
  props<{ error: string }>()
);

export const setStockPilesCardsInitialized = createAction(
  '[StockPilesCards] Set StockPilesCards On Init',
  props<{ stockPilesCards: StockPilesCardsEntity[] }>()
);

export const removeCardsFromStockPileTop = createAction(
  '[StockPilesCards] Remove Cards From Stock Pile Top',
  props<{
    pileId: string;
    cards: Array<{
      type:
        | typeof ACTION_CARD_INTERFACE_NAME
        | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
      id: string;
    }>;
  }>()
);

export const addCardsToStockPileBottom = createAction(
  '[StockPilesCards] Add Cards To Stock Pile Bottom',
  props<{
    pileId: string;
    cards: Array<{
      type:
        | typeof ACTION_CARD_INTERFACE_NAME
        | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
      id: string;
    }>;
  }>()
);

export const removeStockPilesCards = createAction(
  '[StockPilesCards] Remove StockPilesCards',
  props<{ ids: string[] }>()
);

export const addStockPilesCards = createAction(
  '[StockPilesCards] Add StockPilesCards',
  props<{ stockPilesCards: StockPilesCardsEntity[] }>()
);

export const setStockPilesCardsError = createAction(
  '[StockPilesCards] Set StockPilesCards Error',
  props<{ error: string }>()
);
