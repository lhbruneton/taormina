import {
  AgglomerationType,
  LandType,
  ResourceValue,
} from '@taormina/shared-models';

export function getImgSrc(name: string): string {
  return `assets/icons/${name}.png`;
}

export function mapTypeToIconNameFront(type: string): string {
  switch (type) {
    case AgglomerationType.Road:
      return 'path';
    case AgglomerationType.Hamlet:
      return 'village';
    case AgglomerationType.Town:
      return 'village';
    case LandType.ClayPit:
      return 'cliff';
    case LandType.Forest:
      return 'spruce';
    case LandType.GoldMine:
      return 'waterfalls';
    case LandType.Field:
      return 'field';
    case LandType.StoneQuarry:
      return 'cave';
    case LandType.Pasture:
      return 'pasture';
    default:
      throw new Error(`Can't get icon name for type ${type}.`);
  }
}

export function mapDieToIconNameFront(die: ResourceValue): string {
  return `dice_${die}`;
}
