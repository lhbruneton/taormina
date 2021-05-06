import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  AVAILABLE_AGGLOMERATION_SLOT,
} from '../structures/agglomeration';
import {
  AVAILABLE_DEVELOPMENT_SLOT,
  DEVELOPMENT_CARD_INTERFACE_NAME,
} from '../structures/development';
import {
  AVAILABLE_LAND_SLOT,
  LAND_CARD_INTERFACE_NAME,
} from '../structures/land';

export enum DomainColor {
  Red = 'RED',
  Blue = 'BLUE',
}

export type DomainCardType =
  | typeof AGGLOMERATION_CARD_INTERFACE_NAME
  | typeof DEVELOPMENT_CARD_INTERFACE_NAME
  | typeof LAND_CARD_INTERFACE_NAME
  | typeof AVAILABLE_AGGLOMERATION_SLOT
  | typeof AVAILABLE_DEVELOPMENT_SLOT
  | typeof AVAILABLE_LAND_SLOT;

/* eslint-disable no-magic-numbers */
export enum RowValue {
  Lower = -2,
  Low = -1,
  Middle = 0,
  Up = 1,
  Upper = 2,
}
/* eslint-enable no-magic-numbers */
