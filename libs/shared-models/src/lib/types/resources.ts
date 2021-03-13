export enum ResourceType {
  Clay = 'CLAY',
  Wood = 'WOOD',
  Gold = 'GOLD',
  Wheat = 'WHEAT',
  Stone = 'STONE',
  Wool = 'WOOL',
}

export enum LandType {
  ClayPit = 'CLAYPIT',
  Forest = 'FOREST',
  GoldMine = 'GOLDMINE',
  Field = 'FIELD',
  StoneQuarry = 'STONEQUARRY',
  Pasture = 'PASTURE',
}

export type ResourceCount = 0 | 1 | 2 | 3;
