import { createAction, props } from '@ngrx/store';
import { LandsPileEntity } from './lands-pile.models';

export const init = createAction('[LandsPile Page] Init');

export const loadLandsPileSuccess = createAction(
  '[LandsPile/API] Load LandsPile Success',
  props<{ landsPile: LandsPileEntity[] }>()
);

export const loadLandsPileFailure = createAction(
  '[LandsPile/API] Load LandsPile Failure',
  props<{ error: any }>()
);
