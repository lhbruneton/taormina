/**
 * Interface for the 'StockPileCards' data
 *
 * Pivot table between stock piles and cards
 */
export interface StockPileCardsEntity {
  id: string; // Primary ID
  stockPileId: string; // Foreign key to stock piles
  cardId: string; // Foreign key to cards
}
