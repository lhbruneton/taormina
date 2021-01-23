import {
  AgglomerationType,
  CanPrint,
  DomainColor,
  HasColor,
} from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Agglomeration Cards' data
 */
export class AgglomerationCardsEntity
  implements CardsEntity, HasColor, CanPrint {
  id: string;
  type: AgglomerationType;
  color?: DomainColor;

  print() {
    return `${this.type}`;
  }
}

export const createAgglomerationCardsEntity = (
  id: string,
  type: AgglomerationType,
  color?: DomainColor
) => {
  const entity = new AgglomerationCardsEntity();
  entity.id = id;
  entity.type = type;
  entity.color = color;
  return entity;
};

export function createInitialDomainAgglomerationCards() {
  return [
    createAgglomerationCardsEntity(
      uuidv4(),
      AgglomerationType.Hamlet,
      DomainColor.Red
    ),
    createAgglomerationCardsEntity(
      uuidv4(),
      AgglomerationType.Road,
      DomainColor.Red
    ),
    createAgglomerationCardsEntity(
      uuidv4(),
      AgglomerationType.Hamlet,
      DomainColor.Red
    ),
    createAgglomerationCardsEntity(
      uuidv4(),
      AgglomerationType.Hamlet,
      DomainColor.Blue
    ),
    createAgglomerationCardsEntity(
      uuidv4(),
      AgglomerationType.Road,
      DomainColor.Blue
    ),
    createAgglomerationCardsEntity(
      uuidv4(),
      AgglomerationType.Hamlet,
      DomainColor.Blue
    ),
  ];
}

export function createInitialAgglomerationCards() {
  return [
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Road),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Hamlet),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Hamlet),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Hamlet),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Hamlet),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Hamlet),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
    createAgglomerationCardsEntity(uuidv4(), AgglomerationType.Town),
  ];
}
