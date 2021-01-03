/**
 * Interface for the 'HandCards' data
 *
 * Pivot table between hands and cards
 */
export interface HandCardsEntity {
  id: string; // Primary ID
  handId: string; // Foreign key to hands
  cardId: string; // Foreign key to cards
}

export const createHandCardsEntity = (id: string, handId = '', cardId = '') =>
  ({
    id,
    handId: handId || `handId-${id}`,
    cardId: cardId || `cardId-${id}`,
  } as HandCardsEntity);
