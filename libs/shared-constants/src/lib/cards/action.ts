import { ActionCard, createActionCard } from '@taormina/shared-models';

export const actionCards = new Map<string, ActionCard>([
  ['ACTION_1', createActionCard('ACTION_1', 'Soothsayer', [])],
  ['ACTION_2', createActionCard('ACTION_2', 'Soothsayer', [])],
  ['ACTION_3', createActionCard('ACTION_3', 'Pathfinder', [])],
  ['ACTION_4', createActionCard('ACTION_4', 'Pathfinder', [])],
  ['ACTION_5', createActionCard('ACTION_5', 'Goldsmith', [])],
  ['ACTION_6', createActionCard('ACTION_6', 'Goldsmith', [])],
  ['ACTION_7', createActionCard('ACTION_7', 'Trade route', [])],
  ['ACTION_8', createActionCard('ACTION_8', 'Trade route', [])],
  ['ACTION_9', createActionCard('ACTION_9', 'Relocation', [])],
]);
