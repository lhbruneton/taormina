import {
  DiceId,
  DiceValue,
  EventValue,
  ResourceValue,
} from '@taormina/shared-models';

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
    id: DiceId.Resource,
    value,
  } as ResourceDiceEntity);

export const createEventDiceEntity = (value: EventValue) =>
  ({
    id: DiceId.Event,
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
      return EventValue.Event;
    case 3:
      return EventValue.Thieves;
    case 4:
      return EventValue.Trade;
    case 5:
      return EventValue.Celebration;
    case 6:
      return EventValue.Harvest;
  }
}

export function createRandomDice() {
  const resource = createResourceDiceEntity(randomDiceValue());
  const event = createEventDiceEntity(eventFromValue(randomDiceValue()));
  return [resource, event];
}
