import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  developmentCards,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  landCards,
} from '@taormina/shared-constants';
import {
  BuildingName,
  DevelopmentCard,
  DEVELOPMENT_CARD_INTERFACE_NAME,
  DiceValue,
  LandCard,
  LandType,
  LAND_CARD_INTERFACE_NAME,
  MasteryPointsType,
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
  (entities: DomainsCardsEntity[], props: { type: MasteryPointsType }) => {
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
  type: MasteryPointsType
): number => {
  switch (type) {
    case MasteryPointsType.Trade:
      return developmentCard.tradePoints || 0;
    case MasteryPointsType.Strength:
      return developmentCard.strengthPoints || 0;
    // no default
  }
};

const accPointsForType = (
  pivots: DomainsCardsEntity[],
  type: MasteryPointsType
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
  const masteryThreshold = 2;
  if (redPoints > bluePoints && redPoints > masteryThreshold) {
    return ID_DOMAIN_RED;
  } else if (bluePoints > redPoints && bluePoints > masteryThreshold) {
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
          !isNextToAWarehouse(pivot, entities)
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
        !isNextToAWarehouse(pivot, entities)
    )
);

const isNextToAProductionBuilding = (
  pivot: DomainsCardsEntity,
  entities: DomainsCardsEntity[],
  landType: LandType
): boolean => {
  const neighbors = getCardSideNeighbors(pivot, entities);
  return (
    neighbors.find(
      (neighbor) =>
        neighbor.cardId !== undefined &&
        isProductionBuildingForResourceType(neighbor.cardId, landType)
    ) !== undefined
  );
};

const isProductionBuildingForResourceType = (
  cardId: string,
  landType: LandType
): boolean => {
  const name = developmentCards.get(cardId)?.name;
  switch (landType) {
    case LandType.ClayPit:
      return name === BuildingName.Brickyard;
    case LandType.Forest:
      return name === BuildingName.Sawmill;
    case LandType.Field:
      return name === BuildingName.Mill;
    case LandType.StoneQuarry:
      return name === BuildingName.Foundry;
    case LandType.Pasture:
      return name === BuildingName.Weaving;
    case LandType.GoldMine:
      return false;
    // no default
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
        neighbor.cardId !== undefined &&
        developmentCards.get(neighbor.cardId)?.name === BuildingName.Warehouse
    ) !== undefined
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
      (pivot.row < 0 ? domainCard.row < 0 : domainCard.row >= 0)
  );
