export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
export type DiceId = 'RESOURCE' | 'EVENT';
export type ResourceValue = DiceValue;
export type EventValue =
  | 'THIEVES'
  | 'TRADE'
  | 'CELEBRATION'
  | 'HARVEST'
  | 'EVENT';

/**
 * Interface for the 'Dice' data
 */
export interface DiceEntity {
  id: DiceId;
  value: ResourceValue | EventValue;
}

export interface ResourceDiceEntity extends DiceEntity {
  value: ResourceValue;
}

export interface EventDiceEntity extends DiceEntity {
  value: EventValue;
}

export const createResourceDiceEntity = (value: ResourceValue) =>
  ({
    id: 'RESOURCE',
    value,
  } as ResourceDiceEntity);

export const createEventDiceEntity = (value: EventValue) =>
  ({
    id: 'EVENT',
    value,
  } as EventDiceEntity);

function randomDiceValue(): DiceValue {
  const min = 1;
  const max = 6;
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min) as DiceValue;
}

function eventFromValue(value: DiceValue): EventValue {
  switch (value) {
    case 1:
    case 2:
      return 'EVENT';
    case 3:
      return 'THIEVES';
    case 4:
      return 'TRADE';
    case 5:
      return 'CELEBRATION';
    case 6:
      return 'HARVEST';
  }
}

export function createRandomDice() {
  const resource = createResourceDiceEntity(randomDiceValue());
  const event = createEventDiceEntity(eventFromValue(randomDiceValue()));
  return [resource, event];
}
