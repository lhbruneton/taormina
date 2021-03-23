import { createFeatureSelector, createSelector } from '@ngrx/store';
import { landCards } from '@taormina/shared-constants';
import {
  LAND_CARD_INTERFACE_NAME,
  ResourceValue,
} from '@taormina/shared-models';
import { DomainsCardsEntity } from './domains-cards.models';
import {
  DOMAINS_CARDS_FEATURE_KEY,
  DomainsCardsState,
  DomainsCardsPartialState,
  domainsCardsAdapter,
} from './domains-cards.reducer';

// Lookup the 'DomainsCards' feature state managed by NgRx
export const getDomainsCardsState = createFeatureSelector<
  DomainsCardsPartialState,
  DomainsCardsState
>(DOMAINS_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = domainsCardsAdapter.getSelectors();

export const getDomainsCardsLoaded = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.loaded
);

export const getDomainsCardsError = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.errorMsg
);

export const getAllDomainsCards = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => selectAll(state)
);

export const getDomainsCardsEntities = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => selectEntities(state)
);

export const getDomainsCardsSelectedId = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.selectedId
);

export const getDomainsCardsSelected = createSelector(
  getDomainsCardsEntities,
  getDomainsCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);

export const getLandCardsPivotsForDie = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { die: ResourceValue }) =>
    entities.filter((pivot) => {
      if (
        pivot.cardType === LAND_CARD_INTERFACE_NAME &&
        pivot.cardId !== undefined
      ) {
        const land = landCards.get(pivot.cardId);
        if (land && land.die === props.die) return true;
      }
      return false;
    })
);

export const getLandCardPivotById = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { id: string }) =>
    entities.find(
      (pivot) =>
        pivot.cardType === LAND_CARD_INTERFACE_NAME && pivot.id === props.id
    )
);

export const getLandCardPivotWithLockedResources = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[]) =>
    entities.filter(
      (pivot) =>
        pivot.cardType === LAND_CARD_INTERFACE_NAME && pivot.lockedResources > 0
    )
);
