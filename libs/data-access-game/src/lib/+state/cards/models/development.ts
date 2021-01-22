import { DevelopmentType, HasName } from '@taormina/shared-models';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Development Cards' data
 */
export class DevelopmentCardsEntity implements CardsEntity, HasName {
  id: string;
  name: string;
  type: DevelopmentType;
  celebrationPoints: number;
  tradePoints: number;
  strengthPoints: number;
  givesKnowledge: boolean;
  needsTown: boolean;
}

export const createDevelopmentCardsEntity = (
  id: string,
  type: DevelopmentType,
  name: string
) => {
  const entity = new DevelopmentCardsEntity();
  entity.id = id;
  entity.type = type;
  entity.name = name;
  return entity;
};

export function createInitialDevelopmentCards() {
  return [];
}
