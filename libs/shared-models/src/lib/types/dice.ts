export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export enum DiceId {
  Resource = 'RESOURCE',
  Event = 'EVENT',
}

export type ResourceValue = DiceValue;

export enum EventValue {
  Thieves = 'THIEVES',
  Trade = 'TRADE',
  Celebration = 'CELEBRATION',
  Harvest = 'HARVEST',
  Event = 'EVENT',
}
