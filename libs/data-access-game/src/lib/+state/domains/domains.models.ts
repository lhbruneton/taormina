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
