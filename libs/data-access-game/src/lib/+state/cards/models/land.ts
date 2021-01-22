import {
  CanPrint,
  DomainColor,
  HasColor,
  LandType,
  LandValue,
} from '@taormina/shared-models';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Land Cards' data
 */
export class LandCardsEntity implements CardsEntity, HasColor, CanPrint {
  id: string;
  type: LandType;
  value: LandValue;
  color: DomainColor;

  print() {
    return `${this.type} - ${this.value}`;
  }
}

export const createLandCardsEntity = (
  id: string,
  type: LandType,
  value: LandValue,
  color: DomainColor
) => {
  const entity = new LandCardsEntity();
  entity.id = id;
  entity.type = type;
  entity.value = value;
  entity.color = color;
  return entity;
};

export function createInitialLandCards() {
  return [
    createLandCardsEntity(uuidv4(), LandType.ClayPit, 1, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.Forest, 1, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.GoldMine, 0, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.Field, 1, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.StoneQuarry, 1, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.Pasture, 1, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.ClayPit, 1, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.Forest, 1, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.GoldMine, 0, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.Field, 1, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.StoneQuarry, 1, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.Pasture, 1, DomainColor.Blue),
  ];
}
