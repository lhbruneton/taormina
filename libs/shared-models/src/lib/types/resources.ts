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

// eslint-disable-next-line no-magic-numbers
export const RESOURCE_COUNTS = [0, 1, 2, 3] as const;
export type ResourceCount = typeof RESOURCE_COUNTS[number];
