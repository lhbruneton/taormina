import { landCards } from '@taormina/shared-constants';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'LandsPileCards' data
 */
export interface LandsPileCardsEntity {
  id: string; // Primary ID
  cardId: string;
}

export const createLandsPileCardsEntity = (id: string, cardId: string) =>
  ({
    id,
    cardId,
  } as LandsPileCardsEntity);

export const createInitialLandsPileCards = () => {
  const shuffled = arrayShuffle(Array.from(landCards.keys()));
  const entities = shuffled.map((cardId) =>
    createLandsPileCardsEntity(uuidv4(), cardId)
  );
  return entities;
};
