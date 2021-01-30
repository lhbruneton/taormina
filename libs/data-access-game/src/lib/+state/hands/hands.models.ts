import { DomainColor, HasColor } from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'Hands' data
 */
export interface HandsEntity extends HasColor {
  id: string; // Primary ID
  color: DomainColor;
}

export const createHandsEntity = (id: string, color: DomainColor) =>
  ({
    id,
    color,
  } as HandsEntity);

export const createInitialHands = () => {
  return [
    createHandsEntity(uuidv4(), DomainColor.Red),
    createHandsEntity(uuidv4(), DomainColor.Blue),
  ];
};
