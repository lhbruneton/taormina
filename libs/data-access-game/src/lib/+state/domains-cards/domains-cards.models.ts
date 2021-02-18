import {
  ID_CLAY_PIT_BLUE,
  ID_CLAY_PIT_RED,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_FIELD_BLUE,
  ID_FIELD_RED,
  ID_FOREST_BLUE,
  ID_FOREST_RED,
  ID_GOLD_MINE_BLUE,
  ID_GOLD_MINE_RED,
  ID_HAMLET_BLUE_1,
  ID_HAMLET_BLUE_2,
  ID_HAMLET_RED_1,
  ID_HAMLET_RED_2,
  ID_PASTURE_BLUE,
  ID_PASTURE_RED,
  ID_ROAD_BLUE,
  ID_ROAD_RED,
  ID_STONE_QUARRY_BLUE,
  ID_STONE_QUARRY_RED,
} from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  LandValue,
  LAND_CARD_INTERFACE_NAME,
} from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'DomainsCards' data
 */
export interface DomainsCardsEntity {
  id: string; // Primary ID
  domainId: string; // Foreign key to domains
  cardType:
    | typeof AGGLOMERATION_CARD_INTERFACE_NAME
    | typeof DEVELOPMENT_CARD_INTERFACE_NAME
    | typeof LAND_CARD_INTERFACE_NAME;
  cardId: string; // Foreign key to cards
  col: number;
  row: number;
  value?: LandValue;
}

export const createDomainsCardsEntity = (
  id: string,
  domainId: string,
  cardType:
    | typeof AGGLOMERATION_CARD_INTERFACE_NAME
    | typeof DEVELOPMENT_CARD_INTERFACE_NAME
    | typeof LAND_CARD_INTERFACE_NAME,
  cardId: string,
  col: number,
  row: number,
  value?: LandValue
) =>
  ({
    id,
    domainId,
    cardType,
    cardId,
    col,
    row,
    value,
  } as DomainsCardsEntity);

export const createInitialDomainsCards = () => {
  const initialDomainsCards: DomainsCardsEntity[] = [
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      AGGLOMERATION_CARD_INTERFACE_NAME,
      ID_ROAD_RED,
      0,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      AGGLOMERATION_CARD_INTERFACE_NAME,
      ID_HAMLET_RED_1,
      -1,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      AGGLOMERATION_CARD_INTERFACE_NAME,
      ID_HAMLET_RED_2,
      1,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      LAND_CARD_INTERFACE_NAME,
      ID_CLAY_PIT_RED,
      -2,
      -1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      LAND_CARD_INTERFACE_NAME,
      ID_FOREST_RED,
      -2,
      1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      LAND_CARD_INTERFACE_NAME,
      ID_GOLD_MINE_RED,
      0,
      1,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      LAND_CARD_INTERFACE_NAME,
      ID_FIELD_RED,
      2,
      1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      LAND_CARD_INTERFACE_NAME,
      ID_STONE_QUARRY_RED,
      2,
      -1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_RED,
      LAND_CARD_INTERFACE_NAME,
      ID_PASTURE_RED,
      0,
      -1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      AGGLOMERATION_CARD_INTERFACE_NAME,
      ID_ROAD_BLUE,
      0,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      AGGLOMERATION_CARD_INTERFACE_NAME,
      ID_HAMLET_BLUE_1,
      -1,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      AGGLOMERATION_CARD_INTERFACE_NAME,
      ID_HAMLET_BLUE_2,
      1,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      LAND_CARD_INTERFACE_NAME,
      ID_CLAY_PIT_BLUE,
      -2,
      -1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      LAND_CARD_INTERFACE_NAME,
      ID_FOREST_BLUE,
      -2,
      1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      LAND_CARD_INTERFACE_NAME,
      ID_GOLD_MINE_BLUE,
      0,
      1,
      0
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      LAND_CARD_INTERFACE_NAME,
      ID_FIELD_BLUE,
      2,
      1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      LAND_CARD_INTERFACE_NAME,
      ID_STONE_QUARRY_BLUE,
      2,
      -1,
      1
    ),
    createDomainsCardsEntity(
      uuidv4(),
      ID_DOMAIN_BLUE,
      LAND_CARD_INTERFACE_NAME,
      ID_PASTURE_BLUE,
      0,
      -1,
      1
    ),
  ];
  return initialDomainsCards;
};
