import { createHand, DomainColor, Hand } from '@taormina/shared-models';

export const ID_HAND_RED = 'HAND_RED';
export const ID_HAND_BLUE = 'HAND_BLUE';

export const hands = new Map<string, Hand>([
  [ID_HAND_RED, createHand(ID_HAND_RED, DomainColor.Red)],
  [ID_HAND_BLUE, createHand(ID_HAND_BLUE, DomainColor.Blue)],
]);
