/**
 * Interface for the 'Dice' data
 */
export interface DiceEntity {
  id: string; // Primary ID
  name: string;
}

export const createDiceEntity = (id: string, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
  } as DiceEntity);
