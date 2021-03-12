import {
  actionCards,
  developmentCards,
  stockPiles,
} from '@taormina/shared-constants';
import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'StockPilesCards' data
 */
export interface StockPilesCardsEntity {
  id: string; // Primary ID
  pileId: string; // Foreign key to stock piles
  cardType:
    | typeof ACTION_CARD_INTERFACE_NAME
    | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
  cardId: string; // Foreign key to cards
}

export const createStockPilesCardsEntity = (
  id: string,
  pileId: string,
  cardType:
    | typeof ACTION_CARD_INTERFACE_NAME
    | typeof DEVELOPMENT_CARD_INTERFACE_NAME,
  cardId: string
): StockPilesCardsEntity =>
  ({
    id,
    pileId,
    cardType,
    cardId,
  } as StockPilesCardsEntity);

export const createInitialStockPilesCards = (): StockPilesCardsEntity[] => {
  const stockPilesCards: StockPilesCardsEntity[] = [];

  const shuffledCards = arrayShuffle([
    ...Array.from(actionCards.values()),
    ...Array.from(developmentCards.values()),
  ]);

  for (let i = 0; i < stockPiles.length; i++) {
    const pileSize = Math.ceil(shuffledCards.length / stockPiles.length);
    for (let j = 0; j < pileSize; j++) {
      const cardIndex = i * pileSize + j;
      if (cardIndex >= shuffledCards.length) break;
      stockPilesCards.push(
        createStockPilesCardsEntity(
          uuidv4(),
          stockPiles[i],
          shuffledCards[cardIndex].interface,
          shuffledCards[cardIndex].id
        )
      );
    }
  }

  return stockPilesCards;
};
