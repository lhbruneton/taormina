import { eventCards } from '@taormina/shared-constants';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'EventsPileCards' data
 */
export interface EventsPileCardsEntity {
  id: string; // Primary ID
  cardId: string;
}

export const createEventsPileCardsEntity = (
  id: string,
  cardId: string
): EventsPileCardsEntity => ({
  id,
  cardId,
});

export const createInitialEventsPileCards = (): EventsPileCardsEntity[] => {
  const shuffled = arrayShuffle(Array.from(eventCards.keys()).slice(1));
  shuffled.splice(-3, 0, 'EVENT_0');
  const entities = shuffled.map((cardId) =>
    createEventsPileCardsEntity(uuidv4(), cardId)
  );
  return entities;
};
