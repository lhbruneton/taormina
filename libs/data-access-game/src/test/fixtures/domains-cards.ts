/* eslint-disable no-magic-numbers */
import { ID_DOMAIN_BLUE, ID_DOMAIN_RED } from '@taormina/shared-constants';
import { DEVELOPMENT_CARD_INTERFACE_NAME } from '@taormina/shared-models';
import {
  createDomainsCardsEntity,
  DomainsCardsEntity,
} from '../../lib/+state/domains-cards/domains-cards.models';
import { DomainsCardsState } from '../../lib/+state/domains-cards/domains-cards.reducer';

export const someDomainsCardsId = '7a1e11aa-47bb-4b4e-94ab-4c91c19e6a62';
export const redClayPitId = '9ed2d3b8-1d98-4331-969e-09b7f1ba046e';
export const redForestId = '4c6ae71d-6c3e-4f7a-a8fc-bbede5c4156d';
export const someOtherDomainsCardsId = redClayPitId;
export const blueForestId = 'fb675e2e-ee40-4e07-b29c-d6dbd823ca53';
const nextToRedClayPit = '444bebc9-2521-49f0-b790-2668a4baa182';
const nextToBlueForestId = '762a3af1-c807-4fd6-b0f5-c5ec52c1c619';
const redAvailableDevelopmentSlotOneId = '83bada45-309e-4ca6-b59f-e499fdc01b6e';
const redAvailableDevelopmentSlotTwoId = '82ef1e96-e9d2-4e35-9014-2b825e3c2904';
export const redStoneQuarryId = '9c9eac6c-f1c8-42a7-92b9-4d6ac4067310';
const redAvailableDevelopmentSlotThreeId =
  '66d9fc21-e2c0-40ab-88b1-1d87b32022af';
const redAvailableDevelopmentSlotFourId = nextToRedClayPit;
const blueAvailableDevelopmentSlotOneId = nextToBlueForestId;
const blueAvailableDevelopmentSlotTwoId =
  '17dc5ec7-8351-4b0c-8797-688cbafb9a2f';
const blueAvailableDevelopmentSlotThreeId =
  'e9c49a18-8b78-4027-817d-0201dc992982';
const blueAvailableDevelopmentSlotFourId =
  'c2fa4cc2-adac-4a2e-a3d2-751edefb07d0';

export const redClayPitDomainCard: DomainsCardsEntity = {
  id: redClayPitId,
  domainId: 'DOMAIN_RED',
  cardType: 'LandCard',
  cardId: 'CLAY_PIT_RED',
  col: -2,
  row: -1,
  availableResources: 1,
  lockedResources: 0,
};

export const blueForestDomainCard: DomainsCardsEntity = {
  id: blueForestId,
  domainId: 'DOMAIN_BLUE',
  cardType: 'LandCard',
  cardId: 'FOREST_BLUE',
  col: -2,
  row: 1,
  availableResources: 1,
  lockedResources: 0,
};

export const aaaaWarehouseNextToBlueForestDomainCard: DomainsCardsEntity =
  createDomainsCardsEntity(
    'aaaa',
    ID_DOMAIN_BLUE,
    DEVELOPMENT_CARD_INTERFACE_NAME,
    'BUILDING_6', // Warehouse
    -1,
    1
  );

const domainsCardsNewGameStateIds = [
  someDomainsCardsId,
  '8641399b-c626-4e64-8b66-5ea20e580690',
  '283dc5b6-bcef-4050-b6f7-63bfd8df5442',
  '537144b6-b0ca-4e7e-885c-9d6aa2056a72',
  'd5d7a7c4-b8d7-4784-b9fa-690028af57e0',
  redClayPitId,
  redForestId,
  redAvailableDevelopmentSlotOneId,
  'fa10183d-4fd2-48ac-a38a-1af131f250c8',
  redAvailableDevelopmentSlotTwoId,
  'edbe4e44-3977-466a-8b4a-a3f39eff415a',
  redStoneQuarryId,
  redAvailableDevelopmentSlotThreeId,
  '25ee1175-17c7-4f4e-8c35-ea99ee9f1751',
  nextToRedClayPit,
  '3eb0bc9f-23cc-4e61-a53d-95b60da4dd1e',
  '77c56483-29b6-49d2-b332-18536aeb6ae3',
  '4d84a04a-3048-4ffc-9d53-c07ed61a9fe9',
  'e0b83d8e-6e9d-4c80-b408-ff1dfc369f8b',
  '9477ff34-8ee0-4b65-acfe-4bdca0fc5e8f',
  '090d71e8-bad7-485a-a0a3-fd0efc5004c3',
  blueForestId,
  nextToBlueForestId,
  '9eebdfc8-93e9-42b7-8ff6-7bca8d9de9a5',
  blueAvailableDevelopmentSlotTwoId,
  '69d04bf3-3435-4d36-9ae8-4a28b3c21eb2',
  '31d0844a-463d-4308-a852-4093d80bfd7b',
  blueAvailableDevelopmentSlotThreeId,
  '1afeb805-20ea-4751-b307-f6090cc3115c',
  blueAvailableDevelopmentSlotFourId,
];

export const domainsCardsNewGameStateEntities = {
  [someDomainsCardsId]: {
    id: someDomainsCardsId,
    domainId: 'DOMAIN_RED',
    cardType: 'AgglomerationCard',
    cardId: 'ROAD_RED',
    col: 0,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '8641399b-c626-4e64-8b66-5ea20e580690': {
    id: '8641399b-c626-4e64-8b66-5ea20e580690',
    domainId: 'DOMAIN_RED',
    cardType: 'AgglomerationCard',
    cardId: 'HAMLET_RED_1',
    col: -1,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '283dc5b6-bcef-4050-b6f7-63bfd8df5442': {
    id: '283dc5b6-bcef-4050-b6f7-63bfd8df5442',
    domainId: 'DOMAIN_RED',
    cardType: 'AvailableAgglomerationSlot',
    col: -2,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '537144b6-b0ca-4e7e-885c-9d6aa2056a72': {
    id: '537144b6-b0ca-4e7e-885c-9d6aa2056a72',
    domainId: 'DOMAIN_RED',
    cardType: 'AgglomerationCard',
    cardId: 'HAMLET_RED_2',
    col: 1,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  'd5d7a7c4-b8d7-4784-b9fa-690028af57e0': {
    id: 'd5d7a7c4-b8d7-4784-b9fa-690028af57e0',
    domainId: 'DOMAIN_RED',
    cardType: 'AvailableAgglomerationSlot',
    col: 2,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [redClayPitId]: redClayPitDomainCard,
  [redForestId]: {
    id: redForestId,
    domainId: 'DOMAIN_RED',
    cardType: 'LandCard',
    cardId: 'FOREST_RED',
    col: -2,
    row: 1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [redAvailableDevelopmentSlotOneId]: {
    id: redAvailableDevelopmentSlotOneId,
    domainId: 'DOMAIN_RED',
    cardType: 'AvailableDevelopmentSlot',
    col: -1,
    row: 1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  'fa10183d-4fd2-48ac-a38a-1af131f250c8': {
    id: 'fa10183d-4fd2-48ac-a38a-1af131f250c8',
    domainId: 'DOMAIN_RED',
    cardType: 'LandCard',
    cardId: 'GOLD_MINE_RED',
    col: 0,
    row: 1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [redAvailableDevelopmentSlotTwoId]: {
    id: redAvailableDevelopmentSlotTwoId,
    domainId: 'DOMAIN_RED',
    cardType: 'AvailableDevelopmentSlot',
    col: 1,
    row: 1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  'edbe4e44-3977-466a-8b4a-a3f39eff415a': {
    id: 'edbe4e44-3977-466a-8b4a-a3f39eff415a',
    domainId: 'DOMAIN_RED',
    cardType: 'LandCard',
    cardId: 'FIELD_RED',
    col: 2,
    row: 1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [redStoneQuarryId]: {
    id: redStoneQuarryId,
    domainId: 'DOMAIN_RED',
    cardType: 'LandCard',
    cardId: 'STONE_QUARRY_RED',
    col: 2,
    row: -1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [redAvailableDevelopmentSlotThreeId]: {
    id: redAvailableDevelopmentSlotThreeId,
    domainId: 'DOMAIN_RED',
    cardType: 'AvailableDevelopmentSlot',
    col: 1,
    row: -1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '25ee1175-17c7-4f4e-8c35-ea99ee9f1751': {
    id: '25ee1175-17c7-4f4e-8c35-ea99ee9f1751',
    domainId: 'DOMAIN_RED',
    cardType: 'LandCard',
    cardId: 'PASTURE_RED',
    col: 0,
    row: -1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [nextToRedClayPit]: {
    id: nextToRedClayPit,
    domainId: 'DOMAIN_RED',
    cardType: 'AvailableDevelopmentSlot',
    col: -1,
    row: -1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '3eb0bc9f-23cc-4e61-a53d-95b60da4dd1e': {
    id: '3eb0bc9f-23cc-4e61-a53d-95b60da4dd1e',
    domainId: 'DOMAIN_BLUE',
    cardType: 'AgglomerationCard',
    cardId: 'ROAD_BLUE',
    col: 0,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '77c56483-29b6-49d2-b332-18536aeb6ae3': {
    id: '77c56483-29b6-49d2-b332-18536aeb6ae3',
    domainId: 'DOMAIN_BLUE',
    cardType: 'AgglomerationCard',
    cardId: 'HAMLET_BLUE_1',
    col: -1,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '4d84a04a-3048-4ffc-9d53-c07ed61a9fe9': {
    id: '4d84a04a-3048-4ffc-9d53-c07ed61a9fe9',
    domainId: 'DOMAIN_BLUE',
    cardType: 'AvailableAgglomerationSlot',
    col: -2,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  'e0b83d8e-6e9d-4c80-b408-ff1dfc369f8b': {
    id: 'e0b83d8e-6e9d-4c80-b408-ff1dfc369f8b',
    domainId: 'DOMAIN_BLUE',
    cardType: 'AgglomerationCard',
    cardId: 'HAMLET_BLUE_2',
    col: 1,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '9477ff34-8ee0-4b65-acfe-4bdca0fc5e8f': {
    id: '9477ff34-8ee0-4b65-acfe-4bdca0fc5e8f',
    domainId: 'DOMAIN_BLUE',
    cardType: 'AvailableAgglomerationSlot',
    col: 2,
    row: 0,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '090d71e8-bad7-485a-a0a3-fd0efc5004c3': {
    id: '090d71e8-bad7-485a-a0a3-fd0efc5004c3',
    domainId: 'DOMAIN_BLUE',
    cardType: 'LandCard',
    cardId: 'CLAY_PIT_BLUE',
    col: -2,
    row: -1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [blueForestId]: blueForestDomainCard,
  [nextToBlueForestId]: {
    id: nextToBlueForestId,
    domainId: 'DOMAIN_BLUE',
    cardType: 'AvailableDevelopmentSlot',
    col: -1,
    row: 1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '9eebdfc8-93e9-42b7-8ff6-7bca8d9de9a5': {
    id: '9eebdfc8-93e9-42b7-8ff6-7bca8d9de9a5',
    domainId: 'DOMAIN_BLUE',
    cardType: 'LandCard',
    cardId: 'GOLD_MINE_BLUE',
    col: 0,
    row: 1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [blueAvailableDevelopmentSlotTwoId]: {
    id: blueAvailableDevelopmentSlotTwoId,
    domainId: 'DOMAIN_BLUE',
    cardType: 'AvailableDevelopmentSlot',
    col: 1,
    row: 1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '69d04bf3-3435-4d36-9ae8-4a28b3c21eb2': {
    id: '69d04bf3-3435-4d36-9ae8-4a28b3c21eb2',
    domainId: 'DOMAIN_BLUE',
    cardType: 'LandCard',
    cardId: 'FIELD_BLUE',
    col: 2,
    row: 1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '31d0844a-463d-4308-a852-4093d80bfd7b': {
    id: '31d0844a-463d-4308-a852-4093d80bfd7b',
    domainId: 'DOMAIN_BLUE',
    cardType: 'LandCard',
    cardId: 'STONE_QUARRY_BLUE',
    col: 2,
    row: -1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [blueAvailableDevelopmentSlotThreeId]: {
    id: blueAvailableDevelopmentSlotThreeId,
    domainId: 'DOMAIN_BLUE',
    cardType: 'AvailableDevelopmentSlot',
    col: 1,
    row: -1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
  '1afeb805-20ea-4751-b307-f6090cc3115c': {
    id: '1afeb805-20ea-4751-b307-f6090cc3115c',
    domainId: 'DOMAIN_BLUE',
    cardType: 'LandCard',
    cardId: 'PASTURE_BLUE',
    col: 0,
    row: -1,
    availableResources: 1,
    lockedResources: 0,
  } as DomainsCardsEntity,
  [blueAvailableDevelopmentSlotFourId]: {
    id: blueAvailableDevelopmentSlotFourId,
    domainId: 'DOMAIN_BLUE',
    cardType: 'AvailableDevelopmentSlot',
    col: -1,
    row: -1,
    availableResources: 0,
    lockedResources: 0,
  } as DomainsCardsEntity,
};

export const domainsCardsNewGameState: DomainsCardsState = {
  ids: domainsCardsNewGameStateIds,
  entities: domainsCardsNewGameStateEntities,
  selectedIds: [],
  initialized: true,
  loaded: false,
};

export const domainsCardsSawmillNextToBlueForestState =
  (): DomainsCardsState => {
    const newIds = (domainsCardsNewGameState.ids as string[]).filter(
      (id) => id !== nextToBlueForestId
    );
    const newEntities = { ...domainsCardsNewGameState.entities };
    delete newEntities[nextToBlueForestId];

    const domainsCards = {
      ...domainsCardsNewGameState,
      ids: [...newIds, 'aaaa'],
      entities: {
        ...newEntities,
        aaaa: createDomainsCardsEntity(
          'aaaa',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'BUILDING_2', // Sawmill
          -1,
          1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsOneTradeRedTwoTradeBlueState =
  (): DomainsCardsState => {
    const newIds = (domainsCardsNewGameState.ids as string[]).filter(
      (id) =>
        id !== redAvailableDevelopmentSlotOneId &&
        id !== blueAvailableDevelopmentSlotOneId &&
        id !== blueAvailableDevelopmentSlotTwoId
    );
    const newEntities = { ...domainsCardsNewGameState.entities };
    delete newEntities[redAvailableDevelopmentSlotOneId];
    delete newEntities[blueAvailableDevelopmentSlotOneId];
    delete newEntities[blueAvailableDevelopmentSlotTwoId];

    const domainsCards = {
      ...domainsCardsNewGameState,
      ids: [...newIds, 'aaaa', 'bbbb', 'cccc'],
      entities: {
        ...newEntities,
        aaaa: createDomainsCardsEntity(
          'aaaa',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'BUILDING_8', // Market
          -1,
          1
        ),
        bbbb: createDomainsCardsEntity(
          'bbbb',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'BUILDING_9', // Market
          -1,
          1
        ),
        cccc: createDomainsCardsEntity(
          'cccc',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'BUILDING_10', // Toll bridge
          1,
          1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsThreeTradeRedThreeTradeBlueState =
  (): DomainsCardsState => {
    const newIds = (
      domainsCardsOneTradeRedTwoTradeBlueState().ids as string[]
    ).filter(
      (id) =>
        id !== redAvailableDevelopmentSlotTwoId &&
        id !== redAvailableDevelopmentSlotThreeId &&
        id !== blueAvailableDevelopmentSlotThreeId
    );
    const newEntities = {
      ...domainsCardsOneTradeRedTwoTradeBlueState().entities,
    };
    delete newEntities[redAvailableDevelopmentSlotTwoId];
    delete newEntities[redAvailableDevelopmentSlotThreeId];
    delete newEntities[blueAvailableDevelopmentSlotThreeId];

    const domainsCards = {
      ...domainsCardsOneTradeRedTwoTradeBlueState(),
      ids: [...newIds, 'dddd', 'eeee', 'ffff'],
      entities: {
        ...newEntities,
        dddd: createDomainsCardsEntity(
          'dddd',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'SHIP_1',
          1,
          1
        ),
        eeee: createDomainsCardsEntity(
          'eeee',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'SHIP_2',
          1,
          -1
        ),
        ffff: createDomainsCardsEntity(
          'ffff',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'SHIP_3',
          1,
          -1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsFourTradeRedThreeTradeBlueState =
  (): DomainsCardsState => {
    const newIds = (
      domainsCardsThreeTradeRedThreeTradeBlueState().ids as string[]
    ).filter((id) => id !== redAvailableDevelopmentSlotFourId);
    const newEntities = {
      ...domainsCardsThreeTradeRedThreeTradeBlueState().entities,
    };
    delete newEntities[redAvailableDevelopmentSlotFourId];

    const domainsCards = {
      ...domainsCardsThreeTradeRedThreeTradeBlueState(),
      ids: [...newIds, 'gggg'],
      entities: {
        ...newEntities,
        gggg: createDomainsCardsEntity(
          'gggg',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'SHIP_4',
          -1,
          -1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsThreeTradeRedFourTradeBlueState =
  (): DomainsCardsState => {
    const newIds = (
      domainsCardsThreeTradeRedThreeTradeBlueState().ids as string[]
    ).filter((id) => id !== blueAvailableDevelopmentSlotFourId);
    const newEntities = {
      ...domainsCardsThreeTradeRedThreeTradeBlueState().entities,
    };
    delete newEntities[blueAvailableDevelopmentSlotFourId];

    const domainsCards = {
      ...domainsCardsThreeTradeRedThreeTradeBlueState(),
      ids: [...newIds, 'gggg'],
      entities: {
        ...newEntities,
        gggg: createDomainsCardsEntity(
          'gggg',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'SHIP_4',
          -1,
          -1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsOneStrengthRedTwoStrengthBlueState =
  (): DomainsCardsState => {
    const newIds = (domainsCardsNewGameState.ids as string[]).filter(
      (id) =>
        id !== redAvailableDevelopmentSlotOneId &&
        id !== blueAvailableDevelopmentSlotOneId
    );
    const newEntities = { ...domainsCardsNewGameState.entities };
    delete newEntities[redAvailableDevelopmentSlotOneId];
    delete newEntities[blueAvailableDevelopmentSlotOneId];

    const domainsCards = {
      ...domainsCardsNewGameState,
      ids: [...newIds, 'aaaa', 'bbbb'],
      entities: {
        ...newEntities,
        aaaa: createDomainsCardsEntity(
          'aaaa',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_1', // Strength 1
          -1,
          1
        ),
        bbbb: createDomainsCardsEntity(
          'bbbb',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_2', // Strength 2
          -1,
          1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsThreeStrengthRedThreeStrengthBlueState =
  (): DomainsCardsState => {
    const newIds = (domainsCardsNewGameState.ids as string[]).filter(
      (id) =>
        id !== redAvailableDevelopmentSlotOneId &&
        id !== redAvailableDevelopmentSlotTwoId &&
        id !== blueAvailableDevelopmentSlotOneId &&
        id !== blueAvailableDevelopmentSlotTwoId
    );
    const newEntities = { ...domainsCardsNewGameState.entities };
    delete newEntities[redAvailableDevelopmentSlotOneId];
    delete newEntities[redAvailableDevelopmentSlotTwoId];
    delete newEntities[blueAvailableDevelopmentSlotOneId];
    delete newEntities[blueAvailableDevelopmentSlotTwoId];

    const domainsCards = {
      ...domainsCardsNewGameState,
      ids: [...newIds, 'aaaa', 'bbbb', 'cccc', 'dddd'],
      entities: {
        ...newEntities,
        aaaa: createDomainsCardsEntity(
          'aaaa',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_1', // Strength 1
          -1,
          1
        ),
        bbbb: createDomainsCardsEntity(
          'bbbb',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_2', // Strength 2
          1,
          1
        ),
        cccc: createDomainsCardsEntity(
          'cccc',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_3', // Strength 1
          -1,
          1
        ),
        dddd: createDomainsCardsEntity(
          'dddd',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_4', // Strength 2
          1,
          1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsSevenStrengthRedThreeStrengthBlueState =
  (): DomainsCardsState => {
    const newIds = (
      domainsCardsThreeStrengthRedThreeStrengthBlueState().ids as string[]
    ).filter((id) => id !== redAvailableDevelopmentSlotThreeId);
    const newEntities = {
      ...domainsCardsThreeStrengthRedThreeStrengthBlueState().entities,
    };
    delete newEntities[redAvailableDevelopmentSlotThreeId];

    const domainsCards = {
      ...domainsCardsThreeStrengthRedThreeStrengthBlueState(),
      ids: [...newIds, 'eeee'],
      entities: {
        ...newEntities,
        eeee: createDomainsCardsEntity(
          'eeee',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_6', // Strength 4
          1,
          -1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsThreeStrengthRedSevenStrengthBlueState =
  (): DomainsCardsState => {
    const newIds = (
      domainsCardsThreeStrengthRedThreeStrengthBlueState().ids as string[]
    ).filter((id) => id !== blueAvailableDevelopmentSlotThreeId);
    const newEntities = {
      ...domainsCardsThreeStrengthRedThreeStrengthBlueState().entities,
    };
    delete newEntities[blueAvailableDevelopmentSlotThreeId];

    const domainsCards = {
      ...domainsCardsThreeStrengthRedThreeStrengthBlueState(),
      ids: [...newIds, 'eeee'],
      entities: {
        ...newEntities,
        eeee: createDomainsCardsEntity(
          'eeee',
          ID_DOMAIN_BLUE,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'WARRIOR_6', // Strength 4
          1,
          -1
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsWarehouseNextToBlueForestState =
  (): DomainsCardsState => {
    const newIds = (domainsCardsNewGameState.ids as string[]).filter(
      (id) => id !== nextToBlueForestId
    );
    const newEntities = { ...domainsCardsNewGameState.entities };
    delete newEntities[nextToBlueForestId];

    const domainsCards = {
      ...domainsCardsNewGameState,
      ids: [...newIds, 'aaaa'],
      entities: {
        ...newEntities,
        aaaa: aaaaWarehouseNextToBlueForestDomainCard,
      },
    };
    return domainsCards;
  };

export const domainsCardsAuspiciousYearTwoRedOneBlueState =
  (): DomainsCardsState => {
    const newIds = (
      domainsCardsWarehouseNextToBlueForestState().ids as string[]
    ).filter((id) => id !== nextToRedClayPit);
    const newEntities = {
      ...domainsCardsWarehouseNextToBlueForestState().entities,
    };
    delete newEntities[nextToRedClayPit];

    const domainsCards = {
      ...domainsCardsWarehouseNextToBlueForestState(),
      ids: [...newIds, 'bbbb', 'cccc'],
      entities: {
        ...newEntities,
        bbbb: createDomainsCardsEntity(
          'bbbb',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'BUILDING_12', // Monastery
          -1,
          -1
        ),
        cccc: createDomainsCardsEntity(
          'cccc',
          ID_DOMAIN_RED,
          DEVELOPMENT_CARD_INTERFACE_NAME,
          'BUILDING_7', // Warehouse
          -1,
          -2
        ),
      },
    };
    return domainsCards;
  };

export const domainsCardsSwappedForestAndStoneQuarryRedState =
  (): DomainsCardsState => {
    const domainsCards = {
      ...domainsCardsNewGameState,
      selectedIds: [redForestId, redStoneQuarryId],
      entities: {
        ...domainsCardsNewGameState.entities,
        [redForestId]: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...domainsCardsNewGameState.entities[redForestId]!,
          col: 2,
          row: -1,
        },
        [redStoneQuarryId]: {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...domainsCardsNewGameState.entities[redStoneQuarryId]!,
          col: -2,
          row: 1,
        },
      },
    };
    return domainsCards;
  };

export const domainsCardsTwoShipsRedState = (): DomainsCardsState => {
  const newIds = (domainsCardsNewGameState.ids as string[]).filter(
    (id) =>
      id !== redAvailableDevelopmentSlotOneId &&
      id !== redAvailableDevelopmentSlotTwoId
  );
  const newEntities = { ...domainsCardsNewGameState.entities };
  delete newEntities[redAvailableDevelopmentSlotOneId];
  delete newEntities[redAvailableDevelopmentSlotTwoId];

  const domainsCards = {
    ...domainsCardsNewGameState,
    ids: [...newIds, 'aaaa', 'bbbb'],
    entities: {
      ...newEntities,
      aaaa: createDomainsCardsEntity(
        'aaaa',
        ID_DOMAIN_RED,
        DEVELOPMENT_CARD_INTERFACE_NAME,
        'SHIP_1',
        -1,
        1
      ),
      bbbb: createDomainsCardsEntity(
        'bbbb',
        ID_DOMAIN_RED,
        DEVELOPMENT_CARD_INTERFACE_NAME,
        'SHIP_2',
        1,
        1
      ),
    },
  };
  return domainsCards;
};
