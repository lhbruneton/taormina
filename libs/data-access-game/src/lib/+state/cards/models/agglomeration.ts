import {
  AgglomerationType,
  CanPrint,
  DomainColor,
  HasColor,
  HasCost,
  HasVictoryPoints,
  ResourceType,
} from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Agglomeration Cards' data
 */
export class AgglomerationCardsEntity
  implements CardsEntity, HasCost, HasVictoryPoints, HasColor, CanPrint {
  id: string;
  cost: Map<ResourceType, number>;
  type: AgglomerationType;
  victoryPoints?: number;
  color?: DomainColor;

  print() {
    return `${this.type}`;
  }
}

export const createAgglomerationCardsEntity = (
  id: string,
  cost: Map<ResourceType, number>,
  type: AgglomerationType,
  victoryPoints?: number,
  color?: DomainColor
) => {
  const entity = new AgglomerationCardsEntity();
  entity.id = id;
  entity.cost = cost;
  entity.type = type;
  entity.victoryPoints = victoryPoints;
  entity.color = color;
  return entity;
};

function createRoad(color?: DomainColor) {
  return createAgglomerationCardsEntity(
    uuidv4(),
    new Map([
      [ResourceType.Wood, 1],
      [ResourceType.Clay, 2],
    ]),
    AgglomerationType.Road,
    0,
    color
  );
}

function createHamlet(color?: DomainColor) {
  return createAgglomerationCardsEntity(
    uuidv4(),
    new Map([
      [ResourceType.Wood, 1],
      [ResourceType.Clay, 1],
      [ResourceType.Wool, 1],
      [ResourceType.Wheat, 1],
    ]),
    AgglomerationType.Hamlet,
    1,
    color
  );
}

function createTown(color?: DomainColor) {
  return createAgglomerationCardsEntity(
    uuidv4(),
    new Map([
      [ResourceType.Wheat, 2],
      [ResourceType.Stone, 3],
    ]),
    AgglomerationType.Town,
    2,
    color
  );
}

export function createInitialDomainAgglomerationCards() {
  return [
    createRoad(DomainColor.Red),
    createHamlet(DomainColor.Red),
    createHamlet(DomainColor.Red),
    createRoad(DomainColor.Blue),
    createHamlet(DomainColor.Blue),
    createHamlet(DomainColor.Blue),
  ];
}

export function createInitialAgglomerationCards() {
  return [
    // Road x7
    createRoad(),
    createRoad(),
    createRoad(),
    createRoad(),
    createRoad(),
    createRoad(),
    createRoad(),
    // Hamlet x5
    createHamlet(),
    createHamlet(),
    createHamlet(),
    createHamlet(),
    createHamlet(),
    // Town x7
    createTown(),
    createTown(),
    createTown(),
    createTown(),
    createTown(),
    createTown(),
    createTown(),
  ];
}
