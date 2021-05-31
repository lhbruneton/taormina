import { HandsCardsEntity } from '../../lib/+state/hands-cards/hands-cards.models';
import { HandsCardsState } from '../../lib/+state/hands-cards/hands-cards.reducer';

export const someHandsCardsId = '593f5f1c-158b-4f63-83b6-2adda334c4ac';

const handsCardsInitialDrawStateIds = [
  someHandsCardsId,
  '8057b969-99b9-437b-9d98-a327fb012b65',
  '78dade18-299b-4738-81d5-d58ded23baeb',
  '4e11a028-f639-4c3a-b92d-5825f72958a7',
  '47645a9b-97e6-4c77-83dc-1790c7d0dc28',
  '26e3eda0-2eaa-45e8-a54d-7173500f8fd1',
];

const handsCardsInitialDrawStateEntities = {
  [someHandsCardsId]: {
    id: someHandsCardsId,
    handId: 'HAND_RED',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_9',
  } as HandsCardsEntity,
  '8057b969-99b9-437b-9d98-a327fb012b65': {
    id: '8057b969-99b9-437b-9d98-a327fb012b65',
    handId: 'HAND_RED',
    cardType: 'ActionCard',
    cardId: 'ACTION_1',
  } as HandsCardsEntity,
  '78dade18-299b-4738-81d5-d58ded23baeb': {
    id: '78dade18-299b-4738-81d5-d58ded23baeb',
    handId: 'HAND_RED',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_5',
  } as HandsCardsEntity,
  '4e11a028-f639-4c3a-b92d-5825f72958a7': {
    id: '4e11a028-f639-4c3a-b92d-5825f72958a7',
    handId: 'HAND_BLUE',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_3',
  } as HandsCardsEntity,
  '47645a9b-97e6-4c77-83dc-1790c7d0dc28': {
    id: '47645a9b-97e6-4c77-83dc-1790c7d0dc28',
    handId: 'HAND_BLUE',
    cardType: 'ActionCard',
    cardId: 'ACTION_9',
  } as HandsCardsEntity,
  '26e3eda0-2eaa-45e8-a54d-7173500f8fd1': {
    id: '26e3eda0-2eaa-45e8-a54d-7173500f8fd1',
    handId: 'HAND_BLUE',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_2',
  } as HandsCardsEntity,
};

export const handsCardsInitialDrawState: HandsCardsState = {
  ids: handsCardsInitialDrawStateIds,
  entities: handsCardsInitialDrawStateEntities,
  initialized: true,
  loaded: false,
};
