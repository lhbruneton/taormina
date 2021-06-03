import { DiscardPileCardsEntity } from '../../lib/+state/discard-pile-cards/discard-pile-cards.models';
import { DiscardPileCardsState } from '../../lib/+state/discard-pile-cards/discard-pile-cards.reducer';

export const someDiscardPileCardsId = '84419fe2-5d79-4f2b-8431-75fbdd1dcddf';

const discardPileCardsStateIds = [
  'ff23799c-e214-414d-ac23-2be1b9f27d35',
  '895c8c83-0649-4bf2-b7dc-6e7e2220c121',
  someDiscardPileCardsId,
];

export const discardPileCardsStateEntities = {
  'ff23799c-e214-414d-ac23-2be1b9f27d35': {
    id: 'ff23799c-e214-414d-ac23-2be1b9f27d35',
    cardType: 'ActionCard',
    cardId: 'ACTION_8',
  } as DiscardPileCardsEntity,
  '895c8c83-0649-4bf2-b7dc-6e7e2220c121': {
    id: '895c8c83-0649-4bf2-b7dc-6e7e2220c121',
    cardType: 'ActionCard',
    cardId: 'ACTION_4',
  } as DiscardPileCardsEntity,
  [someDiscardPileCardsId]: {
    id: someDiscardPileCardsId,
    cardType: 'ActionCard',
    cardId: 'ACTION_6',
  } as DiscardPileCardsEntity,
};

export const discardPileCardsState: DiscardPileCardsState = {
  ids: discardPileCardsStateIds,
  entities: discardPileCardsStateEntities,
  initialized: true,
  loaded: false,
};

export const discardPileCardsMinusLastCardState = (): DiscardPileCardsState => {
  const newIds = (discardPileCardsState.ids as string[]).filter(
    (id) => id !== someDiscardPileCardsId
  );
  const newEntities = { ...discardPileCardsState.entities };
  delete newEntities[someDiscardPileCardsId];

  const stockPilesCards = {
    ...discardPileCardsState,
    ids: newIds,
    entities: newEntities,
  };
  return stockPilesCards;
};
