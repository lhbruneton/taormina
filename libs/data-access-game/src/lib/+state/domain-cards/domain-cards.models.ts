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
  let firstHamletId: string;

  return [
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof AgglomerationCardsEntity &&
          card.type === AgglomerationType.Road &&
          card.color === domain.color
        );
      }).id,
      0,
      0
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        const found =
          card instanceof AgglomerationCardsEntity &&
          card.type === AgglomerationType.Hamlet &&
          card.color === domain.color;
        if (found) firstHamletId = card.id;
        return found;
      }).id,
      -1,
      0
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof AgglomerationCardsEntity &&
          card.type === AgglomerationType.Hamlet &&
          card.color === domain.color &&
          card.id !== firstHamletId
        );
      }).id,
      1,
      0
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof LandCardsEntity &&
          card.type === LandType.ClayPit &&
          card.color === domain.color
        );
      }).id,
      -2,
      -1
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof LandCardsEntity &&
          card.type === LandType.Forest &&
          card.color === domain.color
        );
      }).id,
      -2,
      1
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof LandCardsEntity &&
          card.type === LandType.GoldMine &&
          card.color === domain.color
        );
      }).id,
      0,
      1
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof LandCardsEntity &&
          card.type === LandType.Field &&
          card.color === domain.color
        );
      }).id,
      2,
      1
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof LandCardsEntity &&
          card.type === LandType.StoneQuarry &&
          card.color === domain.color
        );
      }).id,
      2,
      -1
    ),
    createDomainCardsEntity(
      uuidv4(),
      domain.id,
      cards.find((card) => {
        return (
          card instanceof LandCardsEntity &&
          card.type === LandType.Pasture &&
          card.color === domain.color
        );
      }).id,
      0,
      -1
    ),
  ];
};
