import { HasCost } from '../interfaces/cost';
import { HasId } from '../interfaces/entity';
import { HasName } from '../interfaces/name';
import { HasVictoryPoints } from '../interfaces/victory';
import {
  BuildingName,
  DevelopmentType,
  ShipName,
  ShipNameKey,
  WarriorName,
} from '../types/development';
import { ResourceType } from '../types/resources';

export const DEVELOPMENT_CARD_INTERFACE_NAME = 'DevelopmentCard';

export const AVAILABLE_DEVELOPMENT_SLOT = 'AvailableDevelopmentSlot';

/**
 * Interface for the Development Cards
 */
export interface DevelopmentCard
  extends HasId,
    HasName,
    HasCost,
    HasVictoryPoints {
  interface: typeof DEVELOPMENT_CARD_INTERFACE_NAME;
  id: string;
  name: string;
  cost: Map<ResourceType, number>;
  type: DevelopmentType;
  tradePoints?: number;
  strengthPoints?: number;
  celebrationPoints?: number;
  givesKnowledge?: boolean;
  noDuplicate?: boolean;
  needsTown?: boolean;
  victoryPoints?: number;
}

const createDevelopmentCard = (
  id: string,
  name: string,
  cost: Map<ResourceType, number>,
  type: DevelopmentType
): DevelopmentCard => ({
  interface: DEVELOPMENT_CARD_INTERFACE_NAME,
  id,
  name,
  cost,
  type,
});

export function createBuilding(
  id: string,
  name: BuildingName,
  cost: Map<ResourceType, number>,
  tradePoints?: number,
  givesKnowledge?: boolean,
  noDuplicate?: boolean,
  victoryPoints?: number
): DevelopmentCard {
  const building = createDevelopmentCard(
    id,
    name,
    cost,
    DevelopmentType.Building
  );
  building.tradePoints = tradePoints;
  building.givesKnowledge = givesKnowledge;
  building.noDuplicate = noDuplicate;
  building.victoryPoints = victoryPoints;
  return building;
}

export function createShip(id: string, type: ShipNameKey): DevelopmentCard {
  const name = ShipName.get(type);
  if (name === undefined) {
    throw new Error(`Can't find ship name for type ${type}`);
  }
  const ship = createDevelopmentCard(
    id,
    name,
    new Map([
      [ResourceType.Wood, 1],
      [ResourceType.Wool, 1],
    ]),
    DevelopmentType.Ship
  );
  ship.tradePoints = 1;
  return ship;
}

export function createWarrior(
  id: string,
  name: WarriorName,
  cost: Map<ResourceType, number>,
  strengthPoints?: number,
  celebrationPoints?: number
): DevelopmentCard {
  const warrior = createDevelopmentCard(
    id,
    name,
    cost,
    DevelopmentType.Warrior
  );
  warrior.strengthPoints = strengthPoints;
  warrior.celebrationPoints = celebrationPoints;
  return warrior;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isDevelopmentCard(obj: any): obj is DevelopmentCard {
  return obj !== undefined && obj.interface === DEVELOPMENT_CARD_INTERFACE_NAME;
}
