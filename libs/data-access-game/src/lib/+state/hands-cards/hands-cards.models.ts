import {
  ACTION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';

/**
 * Interface for the 'HandsCards' data
 */
export interface HandsCardsEntity {
  id: string; // Primary ID
  handId: string; // Foreign key to hands
  cardType:
    | typeof ACTION_CARD_INTERFACE_NAME
    | typeof DEVELOPMENT_CARD_INTERFACE_NAME;
  cardId: string; // Foreign key to cards
}

export const createHandsCardsEntity = (
  id: string,
  handId: string,
  cardType:
    | typeof ACTION_CARD_INTERFACE_NAME
    | typeof DEVELOPMENT_CARD_INTERFACE_NAME,
  cardId: string
): HandsCardsEntity => ({
  id,
  handId,
  cardType,
  cardId,
});
