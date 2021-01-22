import { HasName, HasRules } from '@taormina/shared-models';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Action Cards' data
 */
export class ActionCardsEntity implements CardsEntity, HasName, HasRules {
  id: string;
  name: string;
  ruleIds: string[];
}

export const createActionCardsEntity = (
  id: string,
  name: string,
  rulesIds: string[]
) => {
  const entity = new ActionCardsEntity();
  entity.id = id;
  entity.name = name;
  entity.ruleIds = rulesIds;
  return entity;
};

export function createInitialActionCards() {
  return [];
}
