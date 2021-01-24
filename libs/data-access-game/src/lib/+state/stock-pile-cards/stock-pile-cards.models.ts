import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards/cards.models';
import { ActionCardsEntity } from '../cards/models/action';
import { DevelopmentCardsEntity } from '../cards/models/development';
import { StockPilesEntity } from '../stock-piles/stock-piles.models';

/**
 * Interface for the 'StockPileCards' data
 *
 * Pivot table between stock piles and cards
 */
export interface StockPileCardsEntity {
  id: string; // Primary ID
  stockPileId: string; // Foreign key to stock piles
  cardId: string; // Foreign key to cards
}

export const createStockPileCardsEntity = (
  id: string,
  stockPileId: string,
  cardId: string
) =>
  ({
    id,
    stockPileId,
    cardId,
  } as StockPileCardsEntity);

export const createInitialStockPileCards = (
  piles: StockPilesEntity[],
  cards: CardsEntity[]
) => {
  const stockPileCards: StockPileCardsEntity[] = [];

  const filteredCards = cards.filter(
    (card) =>
      card instanceof ActionCardsEntity ||
      card instanceof DevelopmentCardsEntity
  );
  const shuffledCards = arrayShuffle(filteredCards);

  for (let i = 0; i < piles.length; i++) {
    const pileSize = Math.ceil(shuffledCards.length / piles.length);
    for (let j = 0; j < pileSize; j++) {
      const cardIndex = i * pileSize + j;
      if (cardIndex >= shuffledCards.length) break;
      stockPileCards.push(
        createStockPileCardsEntity(
          uuidv4(),
          piles[i].id,
          shuffledCards[cardIndex].id
        )
      );
    }
  }

  return stockPileCards;
};
