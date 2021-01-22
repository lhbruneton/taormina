import { HasName, HasRules } from '@taormina/shared-models';
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

export function createInitialEventCards() {
  return [];
}
