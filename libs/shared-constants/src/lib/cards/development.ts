import {
  createBuilding,
  createShip,
  createWarrior,
  DevelopmentCard,
  DevelopmentType,
  ResourceType,
} from '@taormina/shared-models';

/* eslint-disable no-magic-numbers */
export const developmentCards = new Map<string, DevelopmentCard>([
  // Building
  [
    'BUILDING_1',
    createBuilding(
      'BUILDING_1',
      'Brickyard',
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
      'Sawmill',
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
      'Mill',
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
      'Foundry',
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
      'Weaving',
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
      'Warehouse',
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
      'Warehouse',
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
      'Market',
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
      'Market',
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
      'Toll bridge',
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
  ],
  [
    'BUILDING_12',
    createBuilding(
      'BUILDING_12',
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
  ],
  [
    'BUILDING_13',
    createBuilding(
      'BUILDING_13',
      'Community center',
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
      'Community center',
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
  [
    'SHIP_7',
    {
      ...createBuilding(
        'SHIP_7',
        'Great merchant ship',
        new Map([
          [ResourceType.Wood, 1],
          [ResourceType.Wool, 1],
        ]),
        1
      ),
      type: DevelopmentType.Ship,
    },
  ],
  // Warrior
  [
    'WARRIOR_1',
    createWarrior(
      'WARRIOR_1',
      'Altaïr',
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
      'Ezio',
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
      'Evie',
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
      'Jacob',
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
      'Kassandra',
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
      'Alexios',
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
