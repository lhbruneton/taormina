import { DiceValue, EventValue } from '@taormina/shared-models';

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

export function getRandomProductionDieValue() {
  return randomDiceValue();
}

export function getRandomEventDieValue() {
  return eventFromValue(randomDiceValue());
}
