import { StockPilesCardsEntity } from '../../lib/+state/stock-piles-cards/stock-piles-cards.models';
import { StockPilesCardsState } from '../../lib/+state/stock-piles-cards/stock-piles-cards.reducer';

export const someStockPilesCardsId = '15a60a06-8f50-4536-a5ab-efcbcc35baac';

const stockPilesCardsNewGameStateIds = [
  someStockPilesCardsId,
  'c0c18b36-aa08-4cda-844e-2d7d8ee6b813',
  'e18b0700-a1aa-4852-997b-a9c8fe083ef7',
  'bf10cc83-498f-46d7-98a0-fc6d7859b281',
  '2cf9191e-55e5-4acb-8168-4bf30d471dc1',
  '856c0755-43c2-4335-9001-5f69bea4c6a8',
  '469ffcb8-abca-4083-abfe-ef8b824cc688',
  'e159f4fb-38fb-44ad-a3d7-02886f78a770',
  'b8fc81f4-6de9-4a20-a606-33b2ade604fa',
  'd9473bd2-188d-4982-a00c-86b3d2846e3e',
  '0d0b5243-0884-470d-bd1e-132556f1db1e',
  '436a98c3-d5cb-4b09-978c-6170b04f4086',
  'fe01473d-f085-4e7d-be14-d085663fd21b',
  '0bb2cac4-be92-4a17-918a-99b5238bf15d',
  'f889e2fa-56f5-41d3-9777-1cd65de94691',
  '3b7374a5-244c-4b41-be1a-9d9f949ce650',
  '8103baae-a03a-4768-a648-811ac24d1b3b',
  '35559411-cc5b-4073-9445-5df9d4700e21',
  '38d6fab3-850c-432d-bc93-9d82b9e53661',
  '56801d29-f3e5-4e7c-bbf4-6c94204dc2c5',
  '8da7c4e6-acb6-4439-86e5-4149717a7f59',
  '5fbbf018-e12c-4373-8898-7cdaa36be3ea',
  'f786a6f1-529a-4ec1-ad3e-8c52b53e686a',
  'cfd3d2c1-cc09-4ac1-b642-84e21a478aaa',
  'e556670c-4e7d-4de9-8d7f-d7dee1f8fa3e',
  'a64b7194-5e41-4ba1-99ac-c6b937ea839e',
  '57806b18-b556-4f4a-819d-f1ea73dd8bea',
  '5b8b4f8f-d2e4-4086-b176-859aebbe8da7',
  'a4ae8960-4e04-4b10-8d92-a88968d1d2c9',
  '189bad96-7e91-45dc-807a-c1b0742c3c9f',
  'bfd8108c-b34f-48f2-8640-40597913ed74',
  '0bf8d246-76e9-465c-92da-550293e8e435',
  'f1384cfa-af36-4262-a52c-9c968ac81597',
  'a7642d06-f7ee-4c49-a453-db0e4a16bbef',
  '13b94131-5832-4ced-9e79-09d57ec8e1a8',
  '388cf7c8-3aa1-48e5-b64e-c8c74aa1c3ab',
];

export const stockPilesCardsNewGameStateEntities = {
  [someStockPilesCardsId]: {
    id: someStockPilesCardsId,
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_9',
  } as StockPilesCardsEntity,
  'c0c18b36-aa08-4cda-844e-2d7d8ee6b813': {
    id: 'c0c18b36-aa08-4cda-844e-2d7d8ee6b813',
    pileId: 'STOCK_1',
    cardType: 'ActionCard',
    cardId: 'ACTION_1',
  } as StockPilesCardsEntity,
  'e18b0700-a1aa-4852-997b-a9c8fe083ef7': {
    id: 'e18b0700-a1aa-4852-997b-a9c8fe083ef7',
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_5',
  } as StockPilesCardsEntity,
  'bf10cc83-498f-46d7-98a0-fc6d7859b281': {
    id: 'bf10cc83-498f-46d7-98a0-fc6d7859b281',
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_2',
  } as StockPilesCardsEntity,
  '2cf9191e-55e5-4acb-8168-4bf30d471dc1': {
    id: '2cf9191e-55e5-4acb-8168-4bf30d471dc1',
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_3',
  } as StockPilesCardsEntity,
  '856c0755-43c2-4335-9001-5f69bea4c6a8': {
    id: '856c0755-43c2-4335-9001-5f69bea4c6a8',
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_13',
  } as StockPilesCardsEntity,
  '469ffcb8-abca-4083-abfe-ef8b824cc688': {
    id: '469ffcb8-abca-4083-abfe-ef8b824cc688',
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_7',
  } as StockPilesCardsEntity,
  'e159f4fb-38fb-44ad-a3d7-02886f78a770': {
    id: 'e159f4fb-38fb-44ad-a3d7-02886f78a770',
    pileId: 'STOCK_1',
    cardType: 'ActionCard',
    cardId: 'ACTION_3',
  } as StockPilesCardsEntity,
  'b8fc81f4-6de9-4a20-a606-33b2ade604fa': {
    id: 'b8fc81f4-6de9-4a20-a606-33b2ade604fa',
    pileId: 'STOCK_1',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_6',
  } as StockPilesCardsEntity,
  'd9473bd2-188d-4982-a00c-86b3d2846e3e': {
    id: 'd9473bd2-188d-4982-a00c-86b3d2846e3e',
    pileId: 'STOCK_2',
    cardType: 'ActionCard',
    cardId: 'ACTION_4',
  } as StockPilesCardsEntity,
  '0d0b5243-0884-470d-bd1e-132556f1db1e': {
    id: '0d0b5243-0884-470d-bd1e-132556f1db1e',
    pileId: 'STOCK_2',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_1',
  } as StockPilesCardsEntity,
  '436a98c3-d5cb-4b09-978c-6170b04f4086': {
    id: '436a98c3-d5cb-4b09-978c-6170b04f4086',
    pileId: 'STOCK_2',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_11',
  } as StockPilesCardsEntity,
  'fe01473d-f085-4e7d-be14-d085663fd21b': {
    id: 'fe01473d-f085-4e7d-be14-d085663fd21b',
    pileId: 'STOCK_2',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_1',
  } as StockPilesCardsEntity,
  '0bb2cac4-be92-4a17-918a-99b5238bf15d': {
    id: '0bb2cac4-be92-4a17-918a-99b5238bf15d',
    pileId: 'STOCK_2',
    cardType: 'ActionCard',
    cardId: 'ACTION_8',
  } as StockPilesCardsEntity,
  'f889e2fa-56f5-41d3-9777-1cd65de94691': {
    id: 'f889e2fa-56f5-41d3-9777-1cd65de94691',
    pileId: 'STOCK_2',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_4',
  } as StockPilesCardsEntity,
  '3b7374a5-244c-4b41-be1a-9d9f949ce650': {
    id: '3b7374a5-244c-4b41-be1a-9d9f949ce650',
    pileId: 'STOCK_2',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_4',
  } as StockPilesCardsEntity,
  '8103baae-a03a-4768-a648-811ac24d1b3b': {
    id: '8103baae-a03a-4768-a648-811ac24d1b3b',
    pileId: 'STOCK_2',
    cardType: 'ActionCard',
    cardId: 'ACTION_6',
  } as StockPilesCardsEntity,
  '35559411-cc5b-4073-9445-5df9d4700e21': {
    id: '35559411-cc5b-4073-9445-5df9d4700e21',
    pileId: 'STOCK_2',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_1',
  } as StockPilesCardsEntity,
  '38d6fab3-850c-432d-bc93-9d82b9e53661': {
    id: '38d6fab3-850c-432d-bc93-9d82b9e53661',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_3',
  } as StockPilesCardsEntity,
  '56801d29-f3e5-4e7c-bbf4-6c94204dc2c5': {
    id: '56801d29-f3e5-4e7c-bbf4-6c94204dc2c5',
    pileId: 'STOCK_3',
    cardType: 'ActionCard',
    cardId: 'ACTION_9',
  } as StockPilesCardsEntity,
  '8da7c4e6-acb6-4439-86e5-4149717a7f59': {
    id: '8da7c4e6-acb6-4439-86e5-4149717a7f59',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_2',
  } as StockPilesCardsEntity,
  '5fbbf018-e12c-4373-8898-7cdaa36be3ea': {
    id: '5fbbf018-e12c-4373-8898-7cdaa36be3ea',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_6',
  } as StockPilesCardsEntity,
  'f786a6f1-529a-4ec1-ad3e-8c52b53e686a': {
    id: 'f786a6f1-529a-4ec1-ad3e-8c52b53e686a',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_5',
  } as StockPilesCardsEntity,
  'cfd3d2c1-cc09-4ac1-b642-84e21a478aaa': {
    id: 'cfd3d2c1-cc09-4ac1-b642-84e21a478aaa',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_7',
  } as StockPilesCardsEntity,
  'e556670c-4e7d-4de9-8d7f-d7dee1f8fa3e': {
    id: 'e556670c-4e7d-4de9-8d7f-d7dee1f8fa3e',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_6',
  } as StockPilesCardsEntity,
  'a64b7194-5e41-4ba1-99ac-c6b937ea839e': {
    id: 'a64b7194-5e41-4ba1-99ac-c6b937ea839e',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_3',
  } as StockPilesCardsEntity,
  '57806b18-b556-4f4a-819d-f1ea73dd8bea': {
    id: '57806b18-b556-4f4a-819d-f1ea73dd8bea',
    pileId: 'STOCK_3',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_14',
  } as StockPilesCardsEntity,
  '5b8b4f8f-d2e4-4086-b176-859aebbe8da7': {
    id: '5b8b4f8f-d2e4-4086-b176-859aebbe8da7',
    pileId: 'STOCK_4',
    cardType: 'ActionCard',
    cardId: 'ACTION_5',
  } as StockPilesCardsEntity,
  'a4ae8960-4e04-4b10-8d92-a88968d1d2c9': {
    id: 'a4ae8960-4e04-4b10-8d92-a88968d1d2c9',
    pileId: 'STOCK_4',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_8',
  } as StockPilesCardsEntity,
  '189bad96-7e91-45dc-807a-c1b0742c3c9f': {
    id: '189bad96-7e91-45dc-807a-c1b0742c3c9f',
    pileId: 'STOCK_4',
    cardType: 'DevelopmentCard',
    cardId: 'WARRIOR_5',
  } as StockPilesCardsEntity,
  'bfd8108c-b34f-48f2-8640-40597913ed74': {
    id: 'bfd8108c-b34f-48f2-8640-40597913ed74',
    pileId: 'STOCK_4',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_4',
  } as StockPilesCardsEntity,
  '0bf8d246-76e9-465c-92da-550293e8e435': {
    id: '0bf8d246-76e9-465c-92da-550293e8e435',
    pileId: 'STOCK_4',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_10',
  } as StockPilesCardsEntity,
  'f1384cfa-af36-4262-a52c-9c968ac81597': {
    id: 'f1384cfa-af36-4262-a52c-9c968ac81597',
    pileId: 'STOCK_4',
    cardType: 'ActionCard',
    cardId: 'ACTION_2',
  } as StockPilesCardsEntity,
  'a7642d06-f7ee-4c49-a453-db0e4a16bbef': {
    id: 'a7642d06-f7ee-4c49-a453-db0e4a16bbef',
    pileId: 'STOCK_4',
    cardType: 'DevelopmentCard',
    cardId: 'BUILDING_12',
  } as StockPilesCardsEntity,
  '13b94131-5832-4ced-9e79-09d57ec8e1a8': {
    id: '13b94131-5832-4ced-9e79-09d57ec8e1a8',
    pileId: 'STOCK_4',
    cardType: 'ActionCard',
    cardId: 'ACTION_7',
  } as StockPilesCardsEntity,
  '388cf7c8-3aa1-48e5-b64e-c8c74aa1c3ab': {
    id: '388cf7c8-3aa1-48e5-b64e-c8c74aa1c3ab',
    pileId: 'STOCK_4',
    cardType: 'DevelopmentCard',
    cardId: 'SHIP_2',
  } as StockPilesCardsEntity,
};

export const stockPilesCardsNewGameState: StockPilesCardsState = {
  ids: stockPilesCardsNewGameStateIds,
  entities: stockPilesCardsNewGameStateEntities,
  initialized: true,
  loaded: false,
};

export const stockPilesCardsFirstPileFirstCardDrawnState = (): StockPilesCardsState => {
  const newIds = (stockPilesCardsNewGameState.ids as string[]).filter(
    (id) => id !== someStockPilesCardsId
  );
  const newEntities = { ...stockPilesCardsNewGameState.entities };
  delete newEntities[someStockPilesCardsId];

  const stockPilesCards = {
    ...stockPilesCardsNewGameState,
    ids: newIds,
    entities: newEntities,
  };
  return stockPilesCards;
};

export const stockPilesCardsFirstPileLastCardPutBackState = (): StockPilesCardsState => {
  const newIds = (stockPilesCardsNewGameState.ids as string[]).filter(
    (id) => id !== someStockPilesCardsId
  );
  const newEntities = { ...stockPilesCardsNewGameState.entities };
  delete newEntities[someStockPilesCardsId];

  const stockPilesCards = {
    ...stockPilesCardsNewGameState,
    ids: [...newIds, someStockPilesCardsId],
    entities: {
      ...newEntities,
      [someStockPilesCardsId]:
        stockPilesCardsNewGameStateEntities[someStockPilesCardsId],
    },
  };
  return stockPilesCards;
};
