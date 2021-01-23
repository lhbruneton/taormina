import { HasName, HasRules } from '@taormina/shared-models';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Event Cards' data
 */
export class EventCardsEntity implements CardsEntity, HasName, HasRules {
  id: string;
  name: string;
  ruleIds: string[];
}

export const createEventCardsEntity = (
  id: string,
  name: string,
  ruleIds: string[]
) => {
  const entity = new EventCardsEntity();
  entity.id = id;
  entity.name = name;
  entity.ruleIds = ruleIds;
  return entity;
};

function createInitialEventCards() {
  return [
    createEventCardsEntity(uuidv4(), 'Auspicious year', []),
    createEventCardsEntity(uuidv4(), 'Auspicious year', []),
    createEventCardsEntity(uuidv4(), 'Hawker', []),
    createEventCardsEntity(uuidv4(), 'Hawker', []),
    createEventCardsEntity(uuidv4(), 'Invention', []),
    createEventCardsEntity(uuidv4(), 'Merchant ship travel', []),
    createEventCardsEntity(uuidv4(), 'Quarrel', []),
    createEventCardsEntity(uuidv4(), 'Sibling rivalry', []),
  ];
}

export function getShuffledInitialEventCards() {
  const shuffled = arrayShuffle(createInitialEventCards());
  shuffled.splice(-3, 0, createEventCardsEntity(uuidv4(), 'Festival', []));
  return shuffled;
}
