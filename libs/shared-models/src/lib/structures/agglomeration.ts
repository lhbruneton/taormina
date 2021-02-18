import { HasColor } from '../interfaces/color';
import { HasCost } from '../interfaces/cost';
import { HasId } from '../interfaces/entity';
import { CanPrint } from '../interfaces/print';
import { HasVictoryPoints } from '../interfaces/victory';
import { AgglomerationType } from '../types/agglomeration';
import { DomainColor } from '../types/domain';
import { ResourceType } from '../types/resources';

export const AGGLOMERATION_CARD_INTERFACE_NAME = 'AgglomerationCard';

/**
 * Interface for the Agglomeration Cards
 */
export interface AgglomerationCard
  extends HasId,
    HasCost,
    HasVictoryPoints,
    HasColor,
    CanPrint {
  interface: typeof AGGLOMERATION_CARD_INTERFACE_NAME;
  id: string;
  cost: Map<ResourceType, number>;
  type: AgglomerationType;
  victoryPoints?: number;
  color?: DomainColor;
}

export const createAgglomerationCard = (
  id: string,
  cost: Map<ResourceType, number>,
  type: AgglomerationType,
  victoryPoints?: number,
  color?: DomainColor
) =>
  ({
    interface: AGGLOMERATION_CARD_INTERFACE_NAME,
    id,
    cost,
    type,
    victoryPoints,
    color,
  } as AgglomerationCard);

export function createRoad(id: string, color?: DomainColor) {
  return createAgglomerationCard(
    id,
    new Map([
      [ResourceType.Wood, 1],
      [ResourceType.Clay, 2],
    ]),
    AgglomerationType.Road,
    0,
    color
  );
}

export function createHamlet(id: string, color?: DomainColor) {
  return createAgglomerationCard(
    id,
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

export function createTown(id: string, color?: DomainColor) {
  return createAgglomerationCard(
    id,
    new Map([
      [ResourceType.Wheat, 2],
      [ResourceType.Stone, 3],
    ]),
    AgglomerationType.Town,
    2,
    color
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAgglomerationCard(obj: any): obj is AgglomerationCard {
  return (
    obj !== undefined && obj.interface === AGGLOMERATION_CARD_INTERFACE_NAME
  );
}
