/**
 * Interface for the 'DiscardPileCards' data
 */
export interface DiscardPileCardsEntity {
  id: string; // Primary ID
  cardType: string;
  cardId: string;
}

export const createDiscardPileCardsEntity = (
  id: string,
  cardType: string,
  cardId: string
): DiscardPileCardsEntity => ({
  id,
  cardType,
  cardId,
});
