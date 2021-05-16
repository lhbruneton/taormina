import {
  AnyType,
  BuildingName,
  createBuilding,
  createShip,
  createWarrior,
  DevelopmentCard,
  ResourceType,
  WarriorName,
} from '@taormina/shared-models';

/* eslint-disable no-magic-numbers */
export const developmentCards = new Map<string, DevelopmentCard>([
  // Building
  [
    'BUILDING_1',
    createBuilding(
      'BUILDING_1',
      BuildingName.Brickyard,
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Stone, 1],
      ])
    ),
  ],
  [
    'BUILDING_2',
    createBuilding(
      'BUILDING_2',
      BuildingName.Sawmill,
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Stone, 1],
      ])
    ),
  ],
  [
    'BUILDING_3',
    createBuilding(
      'BUILDING_3',
      BuildingName.Mill,
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wheat, 1],
      ])
    ),
  ],
  [
    'BUILDING_4',
    createBuilding(
      'BUILDING_4',
      BuildingName.Foundry,
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Stone, 1],
      ])
    ),
  ],
  [
    'BUILDING_5',
    createBuilding(
      'BUILDING_5',
      BuildingName.Weaving,
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ])
    ),
  ],
  [
    'BUILDING_6',
    createBuilding(
      'BUILDING_6',
      BuildingName.Warehouse,
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ])
    ),
  ],
  [
    'BUILDING_7',
    createBuilding(
      'BUILDING_7',
      BuildingName.Warehouse,
      new Map([
        [ResourceType.Wood, 1],
        [ResourceType.Wool, 1],
      ])
    ),
  ],
  [
    'BUILDING_8',
    createBuilding(
      'BUILDING_8',
      BuildingName.Market,
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
      ]),
      1,
      false,
      true
    ),
  ],
  [
    'BUILDING_9',
    createBuilding(
      'BUILDING_9',
      BuildingName.Market,
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
      ]),
      1,
      false,
      true
    ),
  ],
  [
    'BUILDING_10',
    createBuilding(
      'BUILDING_10',
      BuildingName.TollBridge,
      new Map([
        [ResourceType.Wool, 1],
        [ResourceType.Clay, 1],
      ]),
      1
    ),
  ],
  [
    'BUILDING_11',
    createBuilding(
      'BUILDING_11',
      BuildingName.Monastery,
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      0,
      true,
      true
    ),
  ],
  [
    'BUILDING_12',
    createBuilding(
      'BUILDING_12',
      BuildingName.Monastery,
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      0,
      true,
      true
    ),
  ],
  [
    'BUILDING_13',
    createBuilding(
      'BUILDING_13',
      BuildingName.CommunityCenter,
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
      ]),
      0,
      false,
      true
    ),
  ],
  [
    'BUILDING_14',
    createBuilding(
      'BUILDING_14',
      BuildingName.CommunityCenter,
      new Map([
        [ResourceType.Clay, 1],
        [ResourceType.Wheat, 1],
      ]),
      0,
      false,
      true
    ),
  ],
  // Ships
  ['SHIP_1', createShip('SHIP_1', ResourceType.Clay)],
  ['SHIP_2', createShip('SHIP_2', ResourceType.Wood)],
  ['SHIP_3', createShip('SHIP_3', ResourceType.Gold)],
  ['SHIP_4', createShip('SHIP_4', ResourceType.Wheat)],
  ['SHIP_5', createShip('SHIP_5', ResourceType.Stone)],
  ['SHIP_6', createShip('SHIP_6', ResourceType.Wool)],
  ['SHIP_7', createShip('SHIP_7', AnyType)],
  // Warrior
  [
    'WARRIOR_1',
    createWarrior(
      'WARRIOR_1',
      WarriorName.Altair,
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      1,
      1
    ),
  ],
  [
    'WARRIOR_2',
    createWarrior(
      'WARRIOR_2',
      WarriorName.Ezio,
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      2,
      1
    ),
  ],
  [
    'WARRIOR_3',
    createWarrior(
      'WARRIOR_3',
      WarriorName.Evie,
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
        [ResourceType.Stone, 1],
      ]),
      1,
      3
    ),
  ],
  [
    'WARRIOR_4',
    createWarrior(
      'WARRIOR_4',
      WarriorName.Jacob,
      new Map([
        [ResourceType.Wheat, 1],
        [ResourceType.Wool, 1],
        [ResourceType.Stone, 1],
      ]),
      2,
      2
    ),
  ],
  [
    'WARRIOR_5',
    createWarrior(
      'WARRIOR_5',
      WarriorName.Kassandra,
      new Map([
        [ResourceType.Wool, 2],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      2,
      3
    ),
  ],
  [
    'WARRIOR_6',
    createWarrior(
      'WARRIOR_6',
      WarriorName.Alexios,
      new Map([
        [ResourceType.Wool, 2],
        [ResourceType.Wheat, 1],
        [ResourceType.Stone, 1],
      ]),
      4,
      1
    ),
  ],
]);
/* eslint-enable no-magic-numbers */
