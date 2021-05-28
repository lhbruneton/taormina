import { EventsPileCardsEntity } from '../../lib/+state/events-pile-cards/events-pile-cards.models';
import { EventsPileCardsState } from '../../lib/+state/events-pile-cards/events-pile-cards.reducer';

export const someEventsPileCardsId = '9e151a39-1957-4a94-bf36-de2d724fccda';

export const eventsPileCardsNewGameStateIds = [
  someEventsPileCardsId,
  'd30e9625-674f-4d41-91f9-a2b5038cfaef',
  '895ff4bf-7fee-4f86-8216-30e0d834553d',
  '98d61ae1-f343-4400-992c-27405e6bc8ce',
  '50f72d2c-50d2-4acd-9804-5073fef2046a',
  '32cdcb57-a861-41a1-9ba3-6c62786a58fb',
  '57735cc9-fead-44bd-8309-b949c786eaaa',
  '57204c1f-5009-4ea3-bd90-a97433cec47c',
  '23213a21-f9ab-48fe-bb4f-cb08ea8761f7',
];

export const eventsPileCardsNewGameStateEntities = {
  [someEventsPileCardsId]: {
    id: someEventsPileCardsId,
    cardId: 'EVENT_1',
  } as EventsPileCardsEntity,
  'd30e9625-674f-4d41-91f9-a2b5038cfaef': {
    id: 'd30e9625-674f-4d41-91f9-a2b5038cfaef',
    cardId: 'EVENT_3',
  } as EventsPileCardsEntity,
  '895ff4bf-7fee-4f86-8216-30e0d834553d': {
    id: '895ff4bf-7fee-4f86-8216-30e0d834553d',
    cardId: 'EVENT_8',
  } as EventsPileCardsEntity,
  '98d61ae1-f343-4400-992c-27405e6bc8ce': {
    id: '98d61ae1-f343-4400-992c-27405e6bc8ce',
    cardId: 'EVENT_7',
  } as EventsPileCardsEntity,
  '50f72d2c-50d2-4acd-9804-5073fef2046a': {
    id: '50f72d2c-50d2-4acd-9804-5073fef2046a',
    cardId: 'EVENT_2',
  } as EventsPileCardsEntity,
  '32cdcb57-a861-41a1-9ba3-6c62786a58fb': {
    id: '32cdcb57-a861-41a1-9ba3-6c62786a58fb',
    cardId: 'EVENT_0',
  } as EventsPileCardsEntity,
  '57735cc9-fead-44bd-8309-b949c786eaaa': {
    id: '57735cc9-fead-44bd-8309-b949c786eaaa',
    cardId: 'EVENT_5',
  } as EventsPileCardsEntity,
  '57204c1f-5009-4ea3-bd90-a97433cec47c': {
    id: '57204c1f-5009-4ea3-bd90-a97433cec47c',
    cardId: 'EVENT_6',
  } as EventsPileCardsEntity,
  '23213a21-f9ab-48fe-bb4f-cb08ea8761f7': {
    id: '23213a21-f9ab-48fe-bb4f-cb08ea8761f7',
    cardId: 'EVENT_4',
  } as EventsPileCardsEntity,
};

export const eventsPileCardsNewGameState: EventsPileCardsState = {
  ids: eventsPileCardsNewGameStateIds,
  entities: eventsPileCardsNewGameStateEntities,
  initialized: true,
  loaded: false,
};

export const eventsPileCardsSelectedState = (): EventsPileCardsState => {
  const domainsCards = {
    ...eventsPileCardsNewGameState,
    selectedId: someEventsPileCardsId,
  };
  return domainsCards;
};

export const eventsPileCardsRemovedSelectedState = (): EventsPileCardsState => {
  const newIds = (eventsPileCardsNewGameState.ids as string[]).filter(
    (id) => id !== someEventsPileCardsId
  );
  const newEntities = { ...eventsPileCardsNewGameState.entities };
  delete newEntities[someEventsPileCardsId];

  const domainsCards = {
    ...eventsPileCardsNewGameState,
    ids: newIds,
    entities: newEntities,
  };
  return domainsCards;
};
