/**
 * Interface for the 'Cards' data
 */
export interface CardsEntity {
  id: string; // Primary ID
  name: string;
}

export const createCardsEntity = (id: string, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
  } as CardsEntity);
