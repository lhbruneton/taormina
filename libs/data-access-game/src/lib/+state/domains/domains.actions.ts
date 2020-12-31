import { createAction, props } from '@ngrx/store';
import { DomainsEntity } from './domains.models';

export const initDomainsNewGame = createAction(
  '[Start Page] Init Domains New Game'
);

export const initDomainsSavedGame = createAction(
  '[Start Page] Init Domains Saved Game'
);

export const loadDomainsSuccess = createAction(
  '[Domains/API] Load Domains Success',
  props<{ domains: DomainsEntity[] }>()
);

export const loadDomainsFailure = createAction(
  '[Domains/API] Load Domains Failure',
  props<{ error: any }>()
);

export const setDomainsInitialized = createAction(
  '[Domains] Set Domains On Init',
  props<{ domains: DomainsEntity[] }>()
);
