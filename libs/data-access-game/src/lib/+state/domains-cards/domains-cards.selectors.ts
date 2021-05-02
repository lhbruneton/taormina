import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  developmentCards,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  landCards,
} from '@taormina/shared-constants';
import {
  DevelopmentCard,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  DiceValue,
  LandCard,
  LandType,
  LAND_CARD_INTERFACE_NAME,
  masteryPointsType,
  ResourceValue,
} from '@taormina/shared-models';
import { DomainsCardsEntity } from './domains-cards.models';
import {
  domainsCardsAdapter,
  DomainsCardsPartialState,
  DomainsCardsState,
  DOMAINS_CARDS_FEATURE_KEY,
} from './domains-cards.reducer';

// Lookup the 'DomainsCards' feature state managed by NgRx
export const getDomainsCardsState = createFeatureSelector<
  DomainsCardsPartialState,
  DomainsCardsState
>(DOMAINS_CARDS_FEATURE_KEY);

const { selectAll, selectEntities } = domainsCardsAdapter.getSelectors();

export const getDomainsCardsLoaded = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.loaded
);

export const getDomainsCardsError = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.errorMsg
);

export const getAllDomainsCards = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => selectAll(state)
);

export const getDomainsCardsEntities = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => selectEntities(state)
);

export const getDomainsCardsSelectedId = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.selectedId
);

export const getDomainsCardsSelected = createSelector(
  getDomainsCardsEntities,
  getDomainsCardsSelectedId,
  (entities, selectedId) => {
    if (selectedId === undefined) return undefined;
    return entities[selectedId];
  }
);

export const getLandCardsPivotsIncreaseOneProduction = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { die: ResourceValue }) =>
    entities.filter((pivot) => {
      const land = getLandCardFilterByDie(pivot, props.die);
      return (
        land !== undefined &&
        !isNextToAProductionBuilding(pivot, entities, land.type)
      );
    })
);

export const getLandCardsPivotsIncreaseTwoProduction = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { die: ResourceValue }) =>
    entities.filter((pivot) => {
      const land = getLandCardFilterByDie(pivot, props.die);
      return (
        land !== undefined &&
        isNextToAProductionBuilding(pivot, entities, land.type)
      );
    })
);

const getLandCardFilterByDie = (
  pivot: DomainsCardsEntity,
  die: DiceValue
): LandCard | undefined => {
  if (
    pivot.cardType === LAND_CARD_INTERFACE_NAME &&
    pivot.cardId !== undefined
  ) {
    const land = landCards.get(pivot.cardId);
    if (land !== undefined && land.die === die) {
      return land;
    }
  }
  return undefined;
};

export const getLandCardPivotById = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { id: string }) =>
    entities.find(
      (pivot) =>
        pivot.cardType === LAND_CARD_INTERFACE_NAME && pivot.id === props.id
    )
);

export const getLandCardPivotWithLockedResources = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[]) =>
    entities.filter(
      (pivot) =>
        pivot.cardType === LAND_CARD_INTERFACE_NAME && pivot.lockedResources > 0
    )
);

export const getDomainMinCol = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { domainId: string }) =>
    Math.min(
      ...entities
        .filter((pivot) => pivot.domainId === props.domainId)
        .map((pivot) => pivot.col)
    )
);

export const getDomainMaxCol = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { domainId: string }) =>
    Math.max(
      ...entities
        .filter((pivot) => pivot.domainId === props.domainId)
        .map((pivot) => pivot.col)
    )
);

export const getDomainMinRow = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { domainId: string }) =>
    Math.min(
      ...entities
        .filter((pivot) => pivot.domainId === props.domainId)
        .map((pivot) => pivot.row)
    )
);

export const getDomainMaxRow = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { domainId: string }) =>
    Math.max(
      ...entities
        .filter((pivot) => pivot.domainId === props.domainId)
        .map((pivot) => pivot.row)
    )
);

export const getMasteryDomainForType = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { type: masteryPointsType }) => {
    const redDomainCards = entities.filter(
      (pivot) => pivot.domainId === ID_DOMAIN_RED
    );
    const blueDomainCards = entities.filter(
      (pivot) => pivot.domainId === ID_DOMAIN_BLUE
    );

    const redTradePoints = accPointsForType(redDomainCards, props.type);
    const blueTradePoints = accPointsForType(blueDomainCards, props.type);

    return fromPointsToMastery(redTradePoints, blueTradePoints);
  }
);

const getDevelopmentCardPointsForType = (
  developmentCard: DevelopmentCard,
  type: masteryPointsType
): number => {
  switch (type) {
    case 'trade':
      return developmentCard.tradePoints || 0;
    case 'strength':
      return developmentCard.strengthPoints || 0;
    default:
      return 0;
  }
};

const accPointsForType = (
  pivots: DomainsCardsEntity[],
  type: masteryPointsType
): number =>
  pivots
    .filter(
      (pivot) =>
        pivot.cardType === DEVELOPMENT_CARD_INTERFACE_NAME &&
        pivot.cardId !== undefined
    )
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((pivot) => developmentCards.get(pivot.cardId!))
    .filter(
      (developmentCard): developmentCard is DevelopmentCard =>
        developmentCard !== undefined
    )
    .map((developmentCard) =>
      getDevelopmentCardPointsForType(developmentCard, type)
    )
    .reduce(
      (accumulator, currentMasteryPoints) => accumulator + currentMasteryPoints,
      0
    );

const fromPointsToMastery = (
  redPoints: number,
  bluePoints: number
): string | undefined => {
  if (redPoints > bluePoints && redPoints > 2) {
    return ID_DOMAIN_RED;
  } else if (bluePoints > redPoints && bluePoints > 2) {
    return ID_DOMAIN_BLUE;
  } else {
    return undefined;
  }
};

export const getDomainResourceCountSeenByThieves = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { domainId: string }) =>
    entities
      .filter(
        (pivot) =>
          pivot.domainId === props.domainId &&
          pivot.cardType === LAND_CARD_INTERFACE_NAME &&
          isNextToAWarehouse(pivot, entities)
      )
      .reduce(
        (accumulator, domainCard) =>
          accumulator + domainCard.availableResources,
        0
      )
);

export const getDomainUnprotectedGoldMinesAndPastures = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[], props: { domainId: string }) =>
    entities.filter(
      (pivot) =>
        pivot.domainId === props.domainId &&
        pivot.cardType === LAND_CARD_INTERFACE_NAME &&
        pivot.cardId !== undefined &&
        (landCards.get(pivot.cardId)?.type === LandType.GoldMine ||
          landCards.get(pivot.cardId)?.type === LandType.Pasture) &&
        isNextToAWarehouse(pivot, entities)
    )
);

const isNextToAProductionBuilding = (
  pivot: DomainsCardsEntity,
  entities: DomainsCardsEntity[],
  landType: LandType
): boolean => {
  const neighbors = getCardSideNeighbors(pivot, entities);
  return (
    neighbors
      .filter((neighbor) => neighbor.cardId !== undefined)
      .find((neighbor) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        isProductionBuildingForResourceType(neighbor.cardId!, landType)
      ) !== undefined
  );
};

const isProductionBuildingForResourceType = (
  cardId: string,
  landType: LandType
): boolean => {
  switch (landType) {
    case LandType.ClayPit:
      return cardId === 'BUILDING_1'; // Brickyard
    case LandType.Forest:
      return cardId === 'BUILDING_2'; // Sawmill
    case LandType.Field:
      return cardId === 'BUILDING_3'; // Mill
    case LandType.StoneQuarry:
      return cardId === 'BUILDING_4'; // Foundry
    case LandType.Pasture:
      return cardId === 'BUILDING_5'; // Weaving
    default:
      return false;
  }
};

const isNextToAWarehouse = (
  pivot: DomainsCardsEntity,
  entities: DomainsCardsEntity[]
): boolean => {
  const neighbors = getCardSideNeighbors(pivot, entities);
  return (
    neighbors.find(
      (neighbor) =>
        neighbor.cardId === 'BUILDING_6' || neighbor.cardId === 'BUILDING_7'
    ) === undefined
  );
};

const getCardSideNeighbors = (
  pivot: DomainsCardsEntity,
  entities: DomainsCardsEntity[]
): DomainsCardsEntity[] =>
  entities.filter(
    (domainCard) =>
      domainCard.domainId === pivot.domainId &&
      (domainCard.col === pivot.col - 1 || domainCard.col === pivot.col + 1) &&
      (pivot.row < 0
        ? domainCard.row === -1 || domainCard.row === -2
        : domainCard.row === 1 || domainCard.row === 2)
  );
