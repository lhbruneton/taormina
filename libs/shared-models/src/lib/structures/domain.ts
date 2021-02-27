import { HasColor } from '../interfaces/color';
import { DomainColor } from '../types/domain';

/**
 * Interface for the Domains
 */
export interface Domain extends HasColor {
  id: string; // Primary ID
  color: DomainColor;
}

export const createDomain = (id: string, color: DomainColor): Domain => ({
  id,
  color,
});
