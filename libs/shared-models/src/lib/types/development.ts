import { ResourceType } from './resources';

export enum DevelopmentType {
  Building = 'BUILDING',
  Ship = 'SHIP',
  Warrior = 'WARRIOR',
}

export enum BuildingName {
  Brickyard = 'Brickyard',
  Sawmill = 'Sawmill',
  Mill = 'Mill',
  Foundry = 'Foundry',
  Weaving = 'Weaving',
  Warehouse = 'Warehouse',
  Market = 'Market',
  TollBridge = 'Toll bridge',
  Monastery = 'Monastery',
  CommunityCenter = 'Community center',
}

export const AnyType = 'ANY';
export type ShipNameKey = ResourceType | typeof AnyType;

export const ShipName: Map<ShipNameKey, string> = new Map<ShipNameKey, string>([
  [ResourceType.Clay, `Merchant ship - ${ResourceType.Clay}`],
  [ResourceType.Wood, `Merchant ship - ${ResourceType.Wood}`],
  [ResourceType.Gold, `Merchant ship - ${ResourceType.Gold}`],
  [ResourceType.Wheat, `Merchant ship - ${ResourceType.Wheat}`],
  [ResourceType.Stone, `Merchant ship - ${ResourceType.Stone}`],
  [ResourceType.Wool, `Merchant ship - ${ResourceType.Wool}`],
  [AnyType, 'Great merchant ship'],
]);

export enum WarriorName {
  Altair = 'Altaïr',
  Ezio = 'Ezio',
  Evie = 'Evie',
  Jacob = 'Jacob',
  Kassandra = 'Kassandra',
  Alexios = 'Alexios',
}

export enum MasteryPointsType {
  Trade = 'TRADE',
  Strength = 'STRENGTH',
}
