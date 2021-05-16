import {
  ActionCard,
  ActionName,
  createActionCard,
} from '@taormina/shared-models';

export const actionCards = new Map<string, ActionCard>([
  ['ACTION_1', createActionCard('ACTION_1', ActionName.Soothsayer, [])],
  ['ACTION_2', createActionCard('ACTION_2', ActionName.Soothsayer, [])],
  ['ACTION_3', createActionCard('ACTION_3', ActionName.Pathfinder, [])],
  ['ACTION_4', createActionCard('ACTION_4', ActionName.Pathfinder, [])],
  ['ACTION_5', createActionCard('ACTION_5', ActionName.Goldsmith, [])],
  ['ACTION_6', createActionCard('ACTION_6', ActionName.Goldsmith, [])],
  ['ACTION_7', createActionCard('ACTION_7', ActionName.TradeRoute, [])],
  ['ACTION_8', createActionCard('ACTION_8', ActionName.TradeRoute, [])],
  ['ACTION_9', createActionCard('ACTION_9', ActionName.Relocation, [])],
]);
