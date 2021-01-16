import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'Domains' data
 */
export interface DomainsEntity {
  id: string; // Primary ID
  name: string;
}

export const createDomainsEntity = (id: string, name = '') =>
  ({
    id,
    name: name || `name-${id}`,
  } as DomainsEntity);

export const createNewDomainsDuel = () => {
  return [
    { id: uuidv4(), name: 'RED' },
    { id: uuidv4(), name: 'BLUE' },
  ];
};
