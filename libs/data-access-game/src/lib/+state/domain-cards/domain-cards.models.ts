import { AgglomerationType, LandType } from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';

import { CardsEntity } from '../cards/cards.models';
import { AgglomerationCardsEntity } from '../cards/models/agglomeration';
import { LandCardsEntity } from '../cards/models/land';
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
  domainId: string,
  cardId: string,
  col: number,
  row: number
) =>
  ({
    id,
    domainId,
    cardId,
    col,
    row,
  } as DomainCardsEntity);

export const createInitialDomainCards = (
  domain: DomainsEntity,
  cards: CardsEntity[]
) => {
  const initialDomainCards: DomainCardsEntity[] = [];

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardRoad(cards, domain).id,
      0,
      0
    )
  );

  const { card, firstHamletId } = findCardFirstHamlet(cards, domain);
  initialDomainCards.push(
    createDomainCardsEntity(uuidv4(), domain.id, card.id, -1, 0)
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardSecondHamlet(cards, domain, firstHamletId).id,
      1,
      0
    )
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardClayPit(cards, domain).id,
      -2,
      -1
    )
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardForest(cards, domain).id,
      -2,
      1
    )
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardGoldMine(cards, domain).id,
      0,
      1
    )
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardField(cards, domain).id,
      2,
      1
    )
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardStoneQuarry(cards, domain).id,
      2,
      -1
    )
  );

  initialDomainCards.push(
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      findCardPasture(cards, domain).id,
      0,
      -1
    )
  );

  return initialDomainCards;
};

function findCardPasture(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof LandCardsEntity &&
      card.type === LandType.Pasture &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'LandType.Pasture' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardStoneQuarry(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof LandCardsEntity &&
      card.type === LandType.StoneQuarry &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'LandType.StoneQuarry' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardField(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof LandCardsEntity &&
      card.type === LandType.Field &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'LandType.Field' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardGoldMine(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof LandCardsEntity &&
      card.type === LandType.GoldMine &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'LandType.GoldMine' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardForest(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof LandCardsEntity &&
      card.type === LandType.Forest &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'LandType.Forest' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardClayPit(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof LandCardsEntity &&
      card.type === LandType.ClayPit &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'LandType.ClayPit' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardSecondHamlet(
  cards: CardsEntity[],
  domain: DomainsEntity,
  firstHamletId: string
) {
  const card = cards.find((card) => {
    return (
      card instanceof AgglomerationCardsEntity &&
      card.type === AgglomerationType.Hamlet &&
      card.color === domain.color &&
      card.id !== firstHamletId
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find second card of type 'AgglomerationType.Hamlet' and color '${domain.color}'`
    );
  }
  return card;
}

function findCardFirstHamlet(cards: CardsEntity[], domain: DomainsEntity) {
  let firstHamletId: string | undefined;

  const card = cards.find((card) => {
    const found =
      card instanceof AgglomerationCardsEntity &&
      card.type === AgglomerationType.Hamlet &&
      card.color === domain.color;
    if (found) firstHamletId = card.id;
    return found;
  });

  if (card === undefined || firstHamletId === undefined) {
    throw new Error(
      `Can't find first card of type 'AgglomerationType.Hamlet' and color '${domain.color}'`
    );
  }
  return { card, firstHamletId };
}

function findCardRoad(cards: CardsEntity[], domain: DomainsEntity) {
  const card = cards.find((card) => {
    return (
      card instanceof AgglomerationCardsEntity &&
      card.type === AgglomerationType.Road &&
      card.color === domain.color
    );
  });

  if (card === undefined) {
    throw new Error(
      `Can't find card of type 'AgglomerationType.Road' and color '${domain.color}'`
    );
  }
  return card;
}
