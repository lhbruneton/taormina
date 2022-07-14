import { AgglomerationType } from '@taormina/shared-models';

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
      return 'castle';
    default:
      throw new Error(`Can't get icon name for type ${type}.`);
  }
}
