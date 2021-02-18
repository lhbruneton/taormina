import { HasColor } from '../interfaces/color';
import { DomainColor } from '../types/domain';

/**
 * Interface for the Hands
 */
export interface Hand extends HasColor {
  id: string; // Primary ID
  color: DomainColor;
}

export const createHand = (id: string, color: DomainColor) =>
  ({
    id,
    color,
  } as Hand);
