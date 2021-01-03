/**
 * Interface for the 'FaceUpPiles' data
 */
export interface FaceUpPilesEntity {
  id: string; // Primary ID
  type: string;
  count: number;
}

export const createFaceUpPilesEntity = (id: string, type = '', count = 0) =>
  ({
    id,
    type: type || `type-${id}`,
    count,
  } as FaceUpPilesEntity);
