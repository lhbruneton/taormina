import { UpdateStr } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import {
  DomainCardType,
  ResourceValue,
  RowValue,
} from '@taormina/shared-models';

import { DomainsCardsEntity } from './domains-cards.models';

export const initDomainsCardsNewGame = createAction(
  '[Start Page] Init DomainsCards New Game'
);

export const initDomainsCardsSavedGame = createAction(
  '[Start Page] Init DomainsCards Saved Game'
);

export const loadDomainsCardsSuccess = createAction(
  '[DomainsCards/API] Load DomainsCards Success',
  props<{ domainsCards: DomainsCardsEntity[] }>()
);

export const loadDomainsCardsFailure = createAction(
  '[DomainsCards/API] Load DomainsCards Failure',
  props<{ error: string }>()
);

export const setDomainsCardsInitialized = createAction(
  '[DomainsCards] Set DomainsCards On Init',
  props<{ domainsCards: DomainsCardsEntity[] }>()
);

export const increaseAvailableResourcesForDie = createAction(
  '[DomainsCards] Increase Available Resources For Die',
  props<{ die: ResourceValue }>()
);

export const increaseAvailableResourcesForAuspiciousYear = createAction(
  '[DomainsCards] Increase Available Resources For Auspicious Year'
);

export const increaseAvailableResources = createAction(
  '[DomainsCards] Increase Available Resources',
  props<{ id: string }>()
);

export const updateDomainCard = createAction(
  '[DomainsCards] Update DomainCard',
  props<{ update: UpdateStr<DomainsCardsEntity> }>()
);

export const updateDomainsCards = createAction(
  '[DomainsCards] Update DomainsCards',
  props<{ updates: UpdateStr<DomainsCardsEntity>[] }>()
);

export const addDomainCard = createAction(
  '[DomainsCards] Add DomainCard',
  props<{ domainCard: DomainsCardsEntity }>()
);

export const lockResource = createAction(
  '[DomainsCards] Lock Resource',
  props<{ id: string }>()
);

export const unlockResources = createAction(
  '[DomainsCards] Unlock Resources',
  props<{ id: string }>()
);

export const useLockedResources = createAction(
  '[DomainsCards] Use Locked Resources'
);

export const toggleDomainCardSelection = createAction(
  '[DomainsCards] Toggle DomainCard Selection',
  props<{ id: string }>()
);

export const clearDomainCardSelection = createAction(
  '[DomainsCards] Clear DomainCards Selection'
);

export const putCardInPivot = createAction(
  '[DomainsCards] Put Card In Pivot',
  props<{
    id: string;
    cardType: DomainCardType;
    cardId: string;
  }>()
);

export const setDomainsCardsError = createAction(
  '[DomainsCards] Set DomainsCards Error',
  props<{ error: string }>()
);

export const createDomainCard = createAction(
  '[DomainsCards] Create DomainCard',
  props<{
    domainId: string;
    cardType: DomainCardType;
    cardId: string | undefined;
    col: number;
    row: RowValue;
  }>()
);

export const countAndStealUnprotectedGoldAndWool = createAction(
  '[DomainsCards] Count And Steal Unprotected Gold And Wool'
);

export const swapSelectedCards = createAction(
  '[DomainsCards] Swap Selected Cards'
);

export const removeDomainCard = createAction(
  '[DomainsCards] Remove DomainCard',
  props<{ id: string }>()
);
