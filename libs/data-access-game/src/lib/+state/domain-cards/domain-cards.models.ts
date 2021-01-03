import { v4 as uuidv4 } from 'uuid';

import { CardsEntity } from '../cards/cards.models';
import { DomainsEntity } from '../domains/domains.models';

/**
 * Interface for the 'DomainCards' data
 *
 * Pivot table between domains and cards
 */
export interface DomainCardsEntity {
  id: string; // Primary ID
  domainId: string; // Foreign key to domains
  cardId: string; // Foreign key to cards
  col: number;
  row: number;
}

export const createDomainCardsEntity = (
  id: string,
  domainId = '',
  cardId = '',
  col = 0,
  row = 0
) =>
  ({
    id,
    domainId: domainId || `domainId-${id}`,
    cardId: cardId || `cardId-${id}`,
    col,
    row,
  } as DomainCardsEntity);

export const createNewDomainCards = (
  domain: DomainsEntity,
  cards: CardsEntity[]
) => {
  return [
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_0_0`).id,
      col: 0,
      row: 0,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_0_-1`).id,
      col: 0,
      row: -1,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_0_1`).id,
      col: 0,
      row: 1,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_-1_0`).id,
      col: -1,
      row: 0,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_-2_-1`).id,
      col: -2,
      row: -1,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_-2_1`).id,
      col: -2,
      row: 1,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_1_0`).id,
      col: 1,
      row: 0,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_2_-1`).id,
      col: 2,
      row: -1,
    },
    {
      id: uuidv4(),
      domainId: domain.id,
      cardId: cards.find((card) => card.name === `${domain.name}_2_1`).id,
      col: 2,
      row: 1,
    },
  ];
};
