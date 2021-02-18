import { createDomain, Domain, DomainColor } from '@taormina/shared-models';

export const ID_DOMAIN_RED = 'DOMAIN_RED';
export const ID_DOMAIN_BLUE = 'DOMAIN_BLUE';

export const domains = new Map<string, Domain>([
  [ID_DOMAIN_RED, createDomain(ID_DOMAIN_RED, DomainColor.Red)],
  [ID_DOMAIN_BLUE, createDomain(ID_DOMAIN_BLUE, DomainColor.Blue)],
]);
