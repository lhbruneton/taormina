import {
  CanPrint,
  DomainColor,
  HasColor,
  LandType,
  LandValue,
  ResourceValue,
} from '@taormina/shared-models';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';
import { CardsEntity } from '../cards.models';

/**
 * Class for the 'Land Cards' data
 */
export class LandCardsEntity implements CardsEntity, HasColor, CanPrint {
  id: string;
  type: LandType;
  value: LandValue;
  die: ResourceValue;
  color?: DomainColor;

  constructor(
    id: string,
    type: LandType,
    value: LandValue,
    die: ResourceValue
  ) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.die = die;
  }

  print() {
    return `${this.type} - ${this.value}`;
  }
}

export const createLandCardsEntity = (
  id: string,
  type: LandType,
  value: LandValue,
  die: ResourceValue,
  color?: DomainColor
) => {
  const entity = new LandCardsEntity(id, type, value, die);
  entity.color = color;
  return entity;
};

export function createInitialDomainLandCards() {
  return [
    createLandCardsEntity(uuidv4(), LandType.ClayPit, 1, 3, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.Forest, 1, 2, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.GoldMine, 0, 1, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.Field, 1, 6, DomainColor.Red),
    createLandCardsEntity(
      uuidv4(),
      LandType.StoneQuarry,
      1,
      5,
      DomainColor.Red
    ),
    createLandCardsEntity(uuidv4(), LandType.Pasture, 1, 4, DomainColor.Red),
    createLandCardsEntity(uuidv4(), LandType.ClayPit, 1, 2, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.Forest, 1, 3, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.GoldMine, 0, 4, DomainColor.Blue),
    createLandCardsEntity(uuidv4(), LandType.Field, 1, 5, DomainColor.Blue),
    createLandCardsEntity(
      uuidv4(),
      LandType.StoneQuarry,
      1,
      6,
      DomainColor.Blue
    ),
    createLandCardsEntity(uuidv4(), LandType.Pasture, 1, 1, DomainColor.Blue),
  ];
}

function createInitialLandCards() {
  return [
    createLandCardsEntity(uuidv4(), LandType.ClayPit, 0, 1),
    createLandCardsEntity(uuidv4(), LandType.Field, 0, 1),
    createLandCardsEntity(uuidv4(), LandType.GoldMine, 0, 2),
    createLandCardsEntity(uuidv4(), LandType.StoneQuarry, 0, 2),
    createLandCardsEntity(uuidv4(), LandType.Field, 0, 3),
    createLandCardsEntity(uuidv4(), LandType.GoldMine, 0, 3),
    createLandCardsEntity(uuidv4(), LandType.Forest, 0, 4),
    createLandCardsEntity(uuidv4(), LandType.StoneQuarry, 0, 4),
    createLandCardsEntity(uuidv4(), LandType.ClayPit, 0, 5),
    createLandCardsEntity(uuidv4(), LandType.Pasture, 0, 5),
    createLandCardsEntity(uuidv4(), LandType.Forest, 0, 6),
    createLandCardsEntity(uuidv4(), LandType.Pasture, 0, 6),
  ];
}

export function getShuffledInitialLandCards() {
  return arrayShuffle(createInitialLandCards());
}
