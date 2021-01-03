/**
 * Interface for the 'Hands' data
 */
export interface HandsEntity {
  id: string; // Primary ID
  name: string;
}

export const createHandsEntity = (id: string, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
  } as HandsEntity);
