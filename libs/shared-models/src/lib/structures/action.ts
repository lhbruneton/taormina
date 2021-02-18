import { HasId } from '../interfaces/entity';
import { HasName } from '../interfaces/name';
import { HasRules } from '../interfaces/rules';

export const ACTION_CARD_INTERFACE_NAME = 'ActionCard';

/**
 * Interface for the Action Cards
 */
export interface ActionCard extends HasId, HasName, HasRules {
  interface: typeof ACTION_CARD_INTERFACE_NAME;
  id: string;
  name: string;
  ruleIds: string[];
}

export const createActionCard = (id: string, name: string, ruleIds: string[]) =>
  ({ interface: ACTION_CARD_INTERFACE_NAME, id, name, ruleIds } as ActionCard);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isActionCard(obj: any): obj is ActionCard {
  return obj !== undefined && obj.interface === ACTION_CARD_INTERFACE_NAME;
}
