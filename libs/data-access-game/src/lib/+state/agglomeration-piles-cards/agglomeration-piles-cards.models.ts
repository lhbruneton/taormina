import {
  agglomerationCards,
  ID_AGGLOMERATION_HAMLET,
  ID_AGGLOMERATION_ROAD,
  ID_AGGLOMERATION_TOWN,
} from '@taormina/shared-constants';
import { AgglomerationType } from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'AgglomerationPilesCards' data
 */
export interface AgglomerationPilesCardsEntity {
  id: string; // Primary ID
  pileId: string;
  cardId: string;
}

export const createAgglomerationPilesCardsEntity = (
  id: string,
  pileId: string,
  cardId: string
): AgglomerationPilesCardsEntity => ({
  id,
  pileId,
  cardId,
});

export const createInitialAgglomerationPilesCards =
  (): AgglomerationPilesCardsEntity[] => {
    const roadEntities = Array.from(agglomerationCards.values())
      .filter(
        (agglomerationCard) =>
          agglomerationCard.type === AgglomerationType.Road &&
          agglomerationCard.color === undefined
      )
      .map((roadCard) =>
        createAgglomerationPilesCardsEntity(
          uuidv4(),
          ID_AGGLOMERATION_ROAD,
          roadCard.id
        )
      );

    const hamletEntities = Array.from(agglomerationCards.values())
      .filter(
        (agglomerationCard) =>
          agglomerationCard.type === AgglomerationType.Hamlet &&
          agglomerationCard.color === undefined
      )
      .map((roadCard) =>
        createAgglomerationPilesCardsEntity(
          uuidv4(),
          ID_AGGLOMERATION_HAMLET,
          roadCard.id
        )
      );

    const townEntities = Array.from(agglomerationCards.values())
      .filter(
        (agglomerationCard) =>
          agglomerationCard.type === AgglomerationType.Town &&
          agglomerationCard.color === undefined
      )
      .map((roadCard) =>
        createAgglomerationPilesCardsEntity(
          uuidv4(),
          ID_AGGLOMERATION_TOWN,
          roadCard.id
        )
      );

    return [...roadEntities, ...hamletEntities, ...townEntities];
  };
