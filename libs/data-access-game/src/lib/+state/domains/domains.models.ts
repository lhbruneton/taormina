import { DomainColor } from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'Domains' data
 */
export interface DomainsEntity {
  id: string; // Primary ID
  color: DomainColor;
}

export const createDomainsEntity = (id: string, color: DomainColor) =>
  ({
    id,
    color,
  } as DomainsEntity);

export const createInitialDomains = () => {
  return [
    createDomainsEntity(uuidv4(), DomainColor.Red),
    createDomainsEntity(uuidv4(), DomainColor.Blue),
  ];
};
