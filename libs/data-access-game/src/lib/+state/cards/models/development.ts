import {
  DevelopmentType,
  HasCost,
  HasName,
  HasVictoryPoints,
  ResourceType,
} from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Development Cards' data
 */
export class DevelopmentCardsEntity
  implements CardsEntity, HasName, HasCost, HasVictoryPoints {
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

export const createDevelopmentCardsEntity = (
  id: string,
  name: string,
  cost: Map<ResourceType, number>,
  type: DevelopmentType
) => {
  const entity = new DevelopmentCardsEntity();
  entity.id = id;
  entity.name = name;
  entity.cost = cost;
  entity.type = type;
  return entity;
};

function createBuilding(
  name: string,
  cost: Map<ResourceType, number>,
  tradePoints?: number,
  givesKnowledge?: boolean,
  noDuplicate?: boolean,
  victoryPoints?: number
) {
  const building = createDevelopmentCardsEntity(
    uuidv4(),
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

function createShip(type: ResourceType) {
  const ship = createDevelopmentCardsEntity(
    uuidv4(),
    `Merchant ship - ${type}`,
    new Map([
      [ResourceType.Wood, 1],
      [ResourceType.Wool, 1],
    ]),
    DevelopmentType.Ship
  );
  ship.tradePoints = 1;
  return ship;
}

function createWarrior(
  name: string,
  cost: Map<ResourceType, number>,
  strengthPoints?: number,
  celebrationPoints?: number
) {
  const warrior = createDevelopmentCardsEntity(
    uuidv4(),
    name,
    cost,
    DevelopmentType.Warrior
  );
  warrior.strengthPoints = strengthPoints;
  warrior.celebrationPoints = celebrationPoints;
  return warrior;
}

export function createInitialDevelopmentCards() {
  return [
    // Building
    createBuilding(
      'Brickyard',
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Stone, 1],
      ])
    ),
    createBuilding(
      'Sawmill',
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Stone, 1],
      ])
    ),
    createBuilding(
      'Mill',
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wheat, 1],
      ])
    ),
    createBuilding(
      'Foundry',
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Stone, 1],
      ])
    ),
    createBuilding(
      'Weaving',
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ])
    ),
    createBuilding(
      'Warehouse',
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ])
    ),
    createBuilding(
      'Warehouse',
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ])
    ),
    createBuilding(
      'Market',
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
      ]),
      1,
      false,
      true
    ),
    createBuilding(
      'Market',
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
      ]),
      1,
      false,
      true
    ),
    createBuilding(
      'Toll bridge',
      new Map([
        [ResourceType.Wool, 1],
        [ResourceType.Clay, 1],
      ]),
      1
    ),
    createBuilding(
      'Great merchant ship',
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ]),
      1
    ),
    createBuilding(
      'Monastery',
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      0,
      true,
      true
    ),
    createBuilding(
      'Monastery',
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      0,
      true,
      true
    ),
    createBuilding(
      'Community center',
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
      ]),
      0,
      false,
      true
    ),
    createBuilding(
      'Community center',
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
      ]),
      0,
      false,
      true
    ),
    // Ships
    createShip(ResourceType.Clay),
    createShip(ResourceType.Wood),
    createShip(ResourceType.Gold),
    createShip(ResourceType.Wheat),
    createShip(ResourceType.Stone),
    createShip(ResourceType.Wool),
    // Warrior
    createWarrior(
      'Altaïr',
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      1,
      1
    ),
    createWarrior(
      'Ezio',
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      2,
      1
    ),
    createWarrior(
      'Evie',
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
        [ResourceType.Stone, 1],
      ]),
      1,
      3
    ),
    createWarrior(
      'Jacob',
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
        [ResourceType.Stone, 1],
      ]),
      2,
      2
    ),
    createWarrior(
      'Kassandra',
      new Map([
        [ResourceType.Wool, 2],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      2,
      3
    ),
    createWarrior(
      'Alexios',
      new Map([
        [ResourceType.Wool, 2],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      4,
      1
    ),
  ];
}
