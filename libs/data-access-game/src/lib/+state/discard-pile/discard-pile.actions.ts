import { createAction, props } from '@ngrx/store';
import { DiscardPileEntity } from './discard-pile.models';

export const initDiscardPile = createAction('[DiscardPile Page] Init');

export const loadDiscardPileSuccess = createAction(
  '[DiscardPile/API] Load DiscardPile Success',
  props<{ discardPile: DiscardPileEntity[] }>()
);

export const loadDiscardPileFailure = createAction(
  '[DiscardPile/API] Load DiscardPile Failure',
  props<{ error: any }>()
);
