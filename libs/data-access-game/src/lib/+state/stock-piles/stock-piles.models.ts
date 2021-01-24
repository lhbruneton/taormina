import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'StockPiles' data
 */
export interface StockPilesEntity {
  id: string; // Primary ID
}

export const createStockPilesEntity = (id: string) =>
  ({
    id,
  } as StockPilesEntity);

export const createInitialStockPiles = () => {
  return [
    createStockPilesEntity(uuidv4()),
    createStockPilesEntity(uuidv4()),
    createStockPilesEntity(uuidv4()),
    createStockPilesEntity(uuidv4()),
  ];
};
