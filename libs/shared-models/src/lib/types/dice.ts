// eslint-disable-next-line no-magic-numbers
export const DICE_VALUES = [1, 2, 3, 4, 5, 6] as const;
export type DiceValue = typeof DICE_VALUES[number];

export enum DiceId {
  Resource = 'RESOURCE',
  Event = 'EVENT',
}

export const RESOURCE_VALUES = DICE_VALUES;
export type ResourceValue = DiceValue;

export enum EventValue {
  Thieves = 'THIEVES',
  Trade = 'TRADE',
  Celebration = 'CELEBRATION',
  Harvest = 'HARVEST',
  Event = 'EVENT',
}
