import { HasColor } from '../interfaces/color';
import { HasId } from '../interfaces/entity';
import { CanPrint } from '../interfaces/print';
import { ResourceValue } from '../types/dice';
import { DomainColor } from '../types/domain';
import { LandType } from '../types/resources';

export const LAND_CARD_INTERFACE_NAME = 'LandCard';

/**
 * Interface for the Land Cards
 */
export interface LandCard extends HasId, HasColor, CanPrint {
  interface: typeof LAND_CARD_INTERFACE_NAME;
  id: string;
  type: LandType;
  die: ResourceValue;
  color?: DomainColor;
}

export const createLandCard = (
  id: string,
  type: LandType,
  die: ResourceValue,
  color?: DomainColor
): LandCard => ({
  interface: LAND_CARD_INTERFACE_NAME,
  id,
  type,
  die,
  color,
  print: (): string => `${type}`,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isLandCard(obj: any): obj is LandCard {
  return obj !== undefined && obj.interface === LAND_CARD_INTERFACE_NAME;
}
