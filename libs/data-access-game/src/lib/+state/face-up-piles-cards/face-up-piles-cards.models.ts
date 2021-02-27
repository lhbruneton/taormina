import {
  agglomerationCards,
  ID_FACE_UP_HAMLET,
  ID_FACE_UP_ROAD,
  ID_FACE_UP_TOWN,
} from '@taormina/shared-constants';
import { AgglomerationType } from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface for the 'FaceUpPilesCards' data
 */
export interface FaceUpPilesCardsEntity {
  id: string; // Primary ID
  pileId: string;
  cardId: string;
}

export const createFaceUpPilesCardsEntity = (
  id: string,
  pileId: string,
  cardId: string
): FaceUpPilesCardsEntity => ({
  id,
  pileId,
  cardId,
});

export const createInitialFaceUpPilesCards = (): FaceUpPilesCardsEntity[] => {
  const roadEntities = Array.from(agglomerationCards.values())
    .filter(
      (agglomerationCard) =>
        agglomerationCard.type === AgglomerationType.Road &&
        agglomerationCard.color === undefined
    )
    .map((roadCard) =>
      createFaceUpPilesCardsEntity(uuidv4(), ID_FACE_UP_ROAD, roadCard.id)
    );

  const hamletEntities = Array.from(agglomerationCards.values())
    .filter(
      (agglomerationCard) =>
        agglomerationCard.type === AgglomerationType.Hamlet &&
        agglomerationCard.color === undefined
    )
    .map((roadCard) =>
      createFaceUpPilesCardsEntity(uuidv4(), ID_FACE_UP_HAMLET, roadCard.id)
    );

  const townEntities = Array.from(agglomerationCards.values())
    .filter(
      (agglomerationCard) =>
        agglomerationCard.type === AgglomerationType.Town &&
        agglomerationCard.color === undefined
    )
    .map((roadCard) =>
      createFaceUpPilesCardsEntity(uuidv4(), ID_FACE_UP_TOWN, roadCard.id)
    );

  return [...roadEntities, ...hamletEntities, ...townEntities];
};
