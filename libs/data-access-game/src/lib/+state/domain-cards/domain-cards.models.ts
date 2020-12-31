/**
 * Interface for the 'DomainCards' data
 *
 * Pivot table between domains and cards
 */
export interface DomainCardsEntity {
  id: string; // Primary ID
  domainId: string; // Foreign key to domains
  cardId: string; // Foreign key to cards
  col: number;
  row: number;
}
