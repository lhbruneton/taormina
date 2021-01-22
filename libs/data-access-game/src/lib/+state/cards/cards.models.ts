/**
 * Interface for the 'Cards' data
 */
export interface CardsEntity {
  id: string; // Primary ID
}

export const createCardsEntity = (id: string) =>
  ({
    id,
  } as CardsEntity);
