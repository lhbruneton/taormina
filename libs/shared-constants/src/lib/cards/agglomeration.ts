import {
  AgglomerationCard,
  createHamlet,
  createRoad,
  createTown,
  DomainColor,
} from '@taormina/shared-models';

export const ID_ROAD_RED = 'ROAD_RED';
export const ID_HAMLET_RED_1 = 'HAMLET_RED_1';
export const ID_HAMLET_RED_2 = 'HAMLET_RED_2';
export const ID_ROAD_BLUE = 'ROAD_BLUE';
export const ID_HAMLET_BLUE_1 = 'HAMLET_BLUE_1';
export const ID_HAMLET_BLUE_2 = 'HAMLET_BLUE_2';

export const agglomerationCards = new Map<string, AgglomerationCard>([
  // Roads Red x1 + Blue x1 + x7
  [ID_ROAD_RED, createRoad(ID_ROAD_RED, DomainColor.Red)],
  [ID_ROAD_BLUE, createRoad(ID_ROAD_BLUE, DomainColor.Blue)],
  ['ROAD_1', createRoad('ROAD_1')],
  ['ROAD_2', createRoad('ROAD_2')],
  ['ROAD_3', createRoad('ROAD_3')],
  ['ROAD_4', createRoad('ROAD_4')],
  ['ROAD_5', createRoad('ROAD_5')],
  ['ROAD_6', createRoad('ROAD_6')],
  ['ROAD_7', createRoad('ROAD_7')],
  // Hamlets Red x2 + Blue x2 + x5
  [ID_HAMLET_RED_1, createHamlet(ID_HAMLET_RED_1, DomainColor.Red)],
  [ID_HAMLET_RED_2, createHamlet(ID_HAMLET_RED_2, DomainColor.Red)],
  [ID_HAMLET_BLUE_1, createHamlet(ID_HAMLET_BLUE_1, DomainColor.Blue)],
  [ID_HAMLET_BLUE_2, createHamlet(ID_HAMLET_BLUE_2, DomainColor.Blue)],
  ['HAMLET_1', createHamlet('HAMLET_1')],
  ['HAMLET_2', createHamlet('HAMLET_2')],
  ['HAMLET_3', createHamlet('HAMLET_3')],
  ['HAMLET_4', createHamlet('HAMLET_4')],
  ['HAMLET_5', createHamlet('HAMLET_5')],
  // Towns x7
  ['TOWN_1', createTown('TOWN_1')],
  ['TOWN_2', createTown('TOWN_2')],
  ['TOWN_3', createTown('TOWN_3')],
  ['TOWN_4', createTown('TOWN_4')],
  ['TOWN_5', createTown('TOWN_5')],
  ['TOWN_6', createTown('TOWN_6')],
  ['TOWN_7', createTown('TOWN_7')],
]);
