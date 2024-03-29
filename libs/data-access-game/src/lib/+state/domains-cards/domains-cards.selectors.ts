import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  agglomerationCards,
  developmentCards,
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  landCards,
} from '@taormina/shared-constants';
import {
  AGGLOMERATION_CARD_INTERFACE_NAME,
  BuildingName,
  DevelopmentCard,
  DevelopmentType,
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
  DomainsCardsState,
  DOMAINS_CARDS_FEATURE_KEY,
} from './domains-cards.reducer';

// Lookup the 'DomainsCards' feature state managed by NgRx
export const getDomainsCardsState = createFeatureSelector<DomainsCardsState>(
  DOMAINS_CARDS_FEATURE_KEY
);

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

export const getDomainsCardsSelectedIds = createSelector(
  getDomainsCardsState,
  (state: DomainsCardsState) => state.selectedIds
);

export const getDomainsCardsSelected = createSelector(
  getDomainsCardsEntities,
  getDomainsCardsSelectedIds,
  (entities, selectedIds) => {
    return selectedIds
      .map((selectedId) => entities[selectedId])
      .filter(
        (selectedEntity) => selectedEntity !== undefined
      ) as DomainsCardsEntity[];
  }
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLandCardsPivotsIncreaseOneProduction = (die: ResourceValue) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    entities.filter((pivot) => {
      const land = getLandCardFilterByDie(pivot, die);
      return (
        land !== undefined &&
        !isNextToAProductionBuilding(pivot, entities, land.type)
      );
    })
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLandCardsPivotsIncreaseTwoProduction = (die: ResourceValue) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    entities.filter((pivot) => {
      const land = getLandCardFilterByDie(pivot, die);
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

export const COUNT_1 = 1;
export const COUNT_2 = 2;
export const COUNT_3 = 3;
export const COUNT_4 = 4;
export const getLandCardsPivotsIncreaseAuspiciousYear = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[]) => {
    return [COUNT_1, COUNT_2, COUNT_3, COUNT_4].map((count) => {
      return entities.filter((pivot) => {
        if (
          pivot.cardType === LAND_CARD_INTERFACE_NAME &&
          pivot.cardId !== undefined
        ) {
          const land = landCards.get(pivot.cardId);
          return (
            land !== undefined &&
            isNextToCountWarehouseOrMonastery(pivot, entities, count)
          );
        }
        return false;
      });
    });
  }
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getLandCardPivotById = (id: string) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    entities.find(
      (pivot) => pivot.cardType === LAND_CARD_INTERFACE_NAME && pivot.id === id
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getDomainMinCol = (domainId: string) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    Math.min(
      ...entities
        .filter((pivot) => pivot.domainId === domainId)
        .map((pivot) => pivot.col)
    )
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getDomainMaxCol = (domainId: string) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    Math.max(
      ...entities
        .filter((pivot) => pivot.domainId === domainId)
        .map((pivot) => pivot.col)
    )
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getDomainMinRow = (domainId: string) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    Math.min(
      ...entities
        .filter((pivot) => pivot.domainId === domainId)
        .map((pivot) => pivot.row)
    )
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getDomainMaxRow = (domainId: string) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    Math.max(
      ...entities
        .filter((pivot) => pivot.domainId === domainId)
        .map((pivot) => pivot.row)
    )
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getMasteryDomainForType = (type: MasteryPointsType) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) => {
    const redDomainCards = entities.filter(
      (pivot) => pivot.domainId === ID_DOMAIN_RED
    );
    const blueDomainCards = entities.filter(
      (pivot) => pivot.domainId === ID_DOMAIN_BLUE
    );

    const redTradePoints = accPointsForType(redDomainCards, type);
    const blueTradePoints = accPointsForType(blueDomainCards, type);

    return fromPointsToMastery(redTradePoints, blueTradePoints);
  });

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
  (entities: DomainsCardsEntity[]) => {
    return [ID_DOMAIN_RED, ID_DOMAIN_BLUE].map((domainId) => {
      return entities
        .filter(
          (pivot) =>
            pivot.domainId === domainId &&
            pivot.cardType === LAND_CARD_INTERFACE_NAME &&
            !isNextToAWarehouse(pivot, entities)
        )
        .reduce(
          (accumulator, domainCard) =>
            accumulator + domainCard.availableResources,
          0
        );
    });
  }
);

export const getDomainUnprotectedGoldMinesAndPastures = createSelector(
  getAllDomainsCards,
  (entities: DomainsCardsEntity[]) => {
    return [ID_DOMAIN_RED, ID_DOMAIN_BLUE].map((domainId) => {
      return entities.filter(
        (pivot) =>
          pivot.domainId === domainId &&
          pivot.cardType === LAND_CARD_INTERFACE_NAME &&
          pivot.cardId !== undefined &&
          (landCards.get(pivot.cardId)?.type === LandType.GoldMine ||
            landCards.get(pivot.cardId)?.type === LandType.Pasture) &&
          !isNextToAWarehouse(pivot, entities)
      );
    });
  }
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

const isNextToCountWarehouseOrMonastery = (
  pivot: DomainsCardsEntity,
  entities: DomainsCardsEntity[],
  count: number
): boolean => {
  const neighbors = getCardSideNeighbors(pivot, entities);
  return (
    neighbors.filter(
      (neighbor) =>
        neighbor.cardId !== undefined &&
        (developmentCards.get(neighbor.cardId)?.name ===
          BuildingName.Warehouse ||
          developmentCards.get(neighbor.cardId)?.name ===
            BuildingName.Monastery)
    ).length === count
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCardsVictoryPointsForDomain = (domainId: string) =>
  createSelector(getAllDomainsCards, (entities) => {
    return entities
      .filter(
        (domainCard) =>
          domainCard.domainId === domainId && domainCard.cardId !== undefined
      )
      .map((domainCard) => {
        switch (domainCard.cardType) {
          case AGGLOMERATION_CARD_INTERFACE_NAME:
            return (
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              agglomerationCards.get(domainCard.cardId!)?.victoryPoints || 0
            );
          case DEVELOPMENT_CARD_INTERFACE_NAME:
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return developmentCards.get(domainCard.cardId!)?.victoryPoints || 0;
          default:
            return 0;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getMerchantShipCountForDomain = (domainId: string) =>
  createSelector(
    getAllDomainsCards,
    (entities: DomainsCardsEntity[]) =>
      entities
        .filter(
          (pivot) => pivot.domainId === domainId && pivot.cardId !== undefined
        )
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((pivot) => developmentCards.get(pivot.cardId!))
        .filter(
          (developmentCard): developmentCard is DevelopmentCard =>
            developmentCard !== undefined
        )
        .filter(
          (developmentCard) => developmentCard.type === DevelopmentType.Ship
        ).length
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getCelebrationPointsForDomain = (domainId: string) =>
  createSelector(getAllDomainsCards, (entities: DomainsCardsEntity[]) =>
    entities
      .filter(
        (pivot) => pivot.domainId === domainId && pivot.cardId !== undefined
      )
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((pivot) => developmentCards.get(pivot.cardId!))
      .filter(
        (developmentCard): developmentCard is DevelopmentCard =>
          developmentCard !== undefined
      )
      .map((developmentCard) => {
        return developmentCard.celebrationPoints || 0;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  );

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const hasDomainCommunityCenter = (domainId: string) =>
  createSelector(
    getAllDomainsCards,
    (entities: DomainsCardsEntity[]) =>
      entities
        .filter(
          (pivot) => pivot.domainId === domainId && pivot.cardId !== undefined
        )
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((pivot) => developmentCards.get(pivot.cardId!))
        .filter(
          (developmentCard): developmentCard is DevelopmentCard =>
            developmentCard !== undefined
        )
        .filter(
          (developmentCard) =>
            developmentCard.name === BuildingName.CommunityCenter
        ).length > 0
  );
