import {
  createLandCard,
  DomainColor,
  LandCard,
  LandType,
} from '@taormina/shared-models';

export const ID_CLAY_PIT_RED = 'CLAY_PIT_RED';
export const ID_FOREST_RED = 'FOREST_RED';
export const ID_GOLD_MINE_RED = 'GOLD_MINE_RED';
export const ID_FIELD_RED = 'FIELD_RED';
export const ID_STONE_QUARRY_RED = 'STONE_QUARRY_RED';
export const ID_PASTURE_RED = 'PASTURE_RED';
export const ID_CLAY_PIT_BLUE = 'CLAY_PIT_BLUE';
export const ID_FOREST_BLUE = 'FOREST_BLUE';
export const ID_GOLD_MINE_BLUE = 'GOLD_MINE_BLUE';
export const ID_FIELD_BLUE = 'FIELD_BLUE';
export const ID_STONE_QUARRY_BLUE = 'STONE_QUARRY_BLUE';
export const ID_PASTURE_BLUE = 'PASTURE_BLUE';

/* eslint-disable no-magic-numbers */
export const landCards = new Map<string, LandCard>([
  [
    ID_CLAY_PIT_RED,
    createLandCard(ID_CLAY_PIT_RED, LandType.ClayPit, 3, DomainColor.Red),
  ],
  [
    ID_FOREST_RED,
    createLandCard(ID_FOREST_RED, LandType.Forest, 2, DomainColor.Red),
  ],
  [
    ID_GOLD_MINE_RED,
    createLandCard(ID_GOLD_MINE_RED, LandType.GoldMine, 1, DomainColor.Red),
  ],
  [
    ID_FIELD_RED,
    createLandCard(ID_FIELD_RED, LandType.Field, 6, DomainColor.Red),
  ],
  [
    ID_STONE_QUARRY_RED,
    createLandCard(
      ID_STONE_QUARRY_RED,
      LandType.StoneQuarry,
      5,
      DomainColor.Red
    ),
  ],
  [
    ID_PASTURE_RED,
    createLandCard(ID_PASTURE_RED, LandType.Pasture, 4, DomainColor.Red),
  ],
  [
    ID_CLAY_PIT_BLUE,
    createLandCard(ID_CLAY_PIT_BLUE, LandType.ClayPit, 2, DomainColor.Blue),
  ],
  [
    ID_FOREST_BLUE,
    createLandCard(ID_FOREST_BLUE, LandType.Forest, 3, DomainColor.Blue),
  ],
  [
    ID_GOLD_MINE_BLUE,
    createLandCard(ID_GOLD_MINE_BLUE, LandType.GoldMine, 4, DomainColor.Blue),
  ],
  [
    ID_FIELD_BLUE,
    createLandCard(ID_FIELD_BLUE, LandType.Field, 5, DomainColor.Blue),
  ],
  [
    ID_STONE_QUARRY_BLUE,
    createLandCard(
      ID_STONE_QUARRY_BLUE,
      LandType.StoneQuarry,
      6,
      DomainColor.Blue
    ),
  ],
  [
    ID_PASTURE_BLUE,
    createLandCard(ID_PASTURE_BLUE, LandType.Pasture, 1, DomainColor.Blue),
  ],
  ['LAND_1', createLandCard('LAND_1', LandType.ClayPit, 1)],
  ['LAND_2', createLandCard('LAND_2', LandType.Field, 1)],
  ['LAND_3', createLandCard('LAND_3', LandType.GoldMine, 2)],
  ['LAND_4', createLandCard('LAND_4', LandType.StoneQuarry, 2)],
  ['LAND_5', createLandCard('LAND_5', LandType.Field, 3)],
  ['LAND_6', createLandCard('LAND_6', LandType.GoldMine, 3)],
  ['LAND_7', createLandCard('LAND_7', LandType.Forest, 4)],
  ['LAND_8', createLandCard('LAND_8', LandType.StoneQuarry, 4)],
  ['LAND_9', createLandCard('LAND_9', LandType.ClayPit, 5)],
  ['LAND_10', createLandCard('LAND_10', LandType.Pasture, 5)],
  ['LAND_11', createLandCard('LAND_11', LandType.Forest, 6)],
  ['LAND_12', createLandCard('LAND_12', LandType.Pasture, 6)],
]);
/* eslint-enable no-magic-numbers */
