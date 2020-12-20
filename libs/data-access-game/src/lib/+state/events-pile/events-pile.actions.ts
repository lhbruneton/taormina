import { createAction, props } from '@ngrx/store';
import { EventsPileEntity } from './events-pile.models';

export const init = createAction('[EventsPile Page] Init');

export const loadEventsPileSuccess = createAction(
  '[EventsPile/API] Load EventsPile Success',
  props<{ eventsPile: EventsPileEntity[] }>()
);

export const loadEventsPileFailure = createAction(
  '[EventsPile/API] Load EventsPile Failure',
  props<{ error: any }>()
);
