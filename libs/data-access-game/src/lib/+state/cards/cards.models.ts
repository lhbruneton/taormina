import { v4 as uuidv4 } from 'uuid';

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

export const createNewCards = () => {
  return [
    { id: uuidv4(), name: 'RED_0_0' },
    { id: uuidv4(), name: 'RED_0_-1' },
    { id: uuidv4(), name: 'RED_0_1' },
    { id: uuidv4(), name: 'RED_-1_0' },
    { id: uuidv4(), name: 'RED_-2_-1' },
    { id: uuidv4(), name: 'RED_-2_1' },
    { id: uuidv4(), name: 'RED_1_0' },
    { id: uuidv4(), name: 'RED_2_-1' },
    { id: uuidv4(), name: 'RED_2_1' },
    { id: uuidv4(), name: 'BLUE_0_0' },
    { id: uuidv4(), name: 'BLUE_0_-1' },
    { id: uuidv4(), name: 'BLUE_0_1' },
    { id: uuidv4(), name: 'BLUE_-1_0' },
    { id: uuidv4(), name: 'BLUE_-2_-1' },
    { id: uuidv4(), name: 'BLUE_-2_1' },
    { id: uuidv4(), name: 'BLUE_1_0' },
    { id: uuidv4(), name: 'BLUE_2_-1' },
    { id: uuidv4(), name: 'BLUE_2_1' },
  ];
};
