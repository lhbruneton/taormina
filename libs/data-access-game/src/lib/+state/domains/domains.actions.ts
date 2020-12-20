import { createAction, props } from '@ngrx/store';
import { DomainsEntity } from './domains.models';

export const init = createAction('[Domains Page] Init');

export const loadDomainsSuccess = createAction(
  '[Domains/API] Load Domains Success',
  props<{ domains: DomainsEntity[] }>()
);

export const loadDomainsFailure = createAction(
  '[Domains/API] Load Domains Failure',
  props<{ error: any }>()
);
