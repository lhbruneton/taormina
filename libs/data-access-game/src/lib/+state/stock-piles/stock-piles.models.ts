/**
 * Interface for the 'StockPiles' data
 */
export interface StockPilesEntity {
  id: string; // Primary ID
}

export const createStockPilesEntity = (id: string, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
  } as StockPilesEntity);
