import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DomainsCardsActions from './domains-cards.actions';
import { DomainsCardsEntity } from './domains-cards.models';

export const DOMAINS_CARDS_FEATURE_KEY = 'domainsCards';

export interface DomainsCardsState extends EntityState<DomainsCardsEntity> {
  selectedIds: string[];
  initialized: boolean;
  loaded: boolean;
  errorMsg?: string;
}

export interface DomainsCardsPartialState {
  readonly [DOMAINS_CARDS_FEATURE_KEY]: DomainsCardsState;
}

export const domainsCardsAdapter: EntityAdapter<DomainsCardsEntity> =
  createEntityAdapter<DomainsCardsEntity>();

export const initialDomainsCardsState: DomainsCardsState =
  domainsCardsAdapter.getInitialState({
    selectedIds: [],
    initialized: false,
    loaded: false,
  });

export const domainsCardsReducer = createReducer(
  initialDomainsCardsState,
  on(DomainsCardsActions.initDomainsCardsNewGame, (state) => ({
    ...state,
    initialized: false,
  })),
  on(DomainsCardsActions.initDomainsCardsSavedGame, (state) => ({
    ...state,
    loaded: false,
    errorMsg: undefined,
  })),
  on(DomainsCardsActions.loadDomainsCardsSuccess, (state, { domainsCards }) =>
    domainsCardsAdapter.setAll(domainsCards, { ...state, loaded: true })
  ),
  on(DomainsCardsActions.loadDomainsCardsFailure, (state, { error }) => ({
    ...state,
    errorMsg: error,
  })),
  on(
    DomainsCardsActions.setDomainsCardsInitialized,
    (state, { domainsCards }) =>
      domainsCardsAdapter.setAll(domainsCards, { ...state, initialized: true })
  ),
  on(DomainsCardsActions.updateDomainCard, (state, { update }) =>
    domainsCardsAdapter.updateOne(update, state)
  ),
  on(DomainsCardsActions.updateDomainsCards, (state, { updates }) =>
    domainsCardsAdapter.updateMany(updates, state)
  ),
  on(DomainsCardsActions.addDomainCard, (state, { domainCard }) =>
    domainsCardsAdapter.addOne(domainCard, state)
  ),
  on(DomainsCardsActions.toggleDomainCardSelection, (state, { id }) => {
    const foundId = state.selectedIds.find((selectedId) => selectedId === id);

    let newSelectedIds;
    if (foundId === undefined) {
      newSelectedIds = [...state.selectedIds, id];
    } else {
      newSelectedIds = state.selectedIds.filter(
        (selectedId) => selectedId !== foundId
      );
    }

    return {
      ...state,
      selectedIds: newSelectedIds,
    };
  }),
  on(DomainsCardsActions.clearDomainCardSelection, (state) => ({
    ...state,
    selectedIds: [],
  })),
  on(DomainsCardsActions.swapSelectedCards, (state) => {
    const card0 = state.entities[state.selectedIds[0]];
    const card1 = state.entities[state.selectedIds[1]];
    if (card0 === undefined || card1 === undefined) {
      throw new Error(
        `Something went wrong, card0 and card1 shouldn't be undefined at this point.`
      );
    }
    const newCard0 = { ...card0, col: card1.col, row: card1.row };
    const newCard1 = { ...card1, col: card0.col, row: card0.row };

    return {
      ...state,
      entities: {
        ...state.entities,
        [card0.id]: newCard0,
        [card1.id]: newCard1,
      },
    };
  }),
  on(DomainsCardsActions.removeDomainCard, (state, { id }) =>
    domainsCardsAdapter.removeOne(id, state)
  ),
  on(DomainsCardsActions.setDomainsCardsError, (state, { error }) => ({
    ...state,
    errorMsg: error,
  }))
);
