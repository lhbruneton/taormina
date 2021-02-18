import { HasId } from '../interfaces/entity';
import { HasName } from '../interfaces/name';
import { HasRules } from '../interfaces/rules';

export const EVENT_CARD_INTERFACE_NAME = 'DevelopmentCard';

/**
 * Interface for the Event Cards
 */
export interface EventCard extends HasId, HasName, HasRules {
  interface: typeof EVENT_CARD_INTERFACE_NAME;
  id: string;
  name: string;
  ruleIds: string[];
}

export const createEventCard = (id: string, name: string, ruleIds: string[]) =>
  ({ interface: EVENT_CARD_INTERFACE_NAME, id, name, ruleIds } as EventCard);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEventCard(obj: any): obj is EventCard {
  return obj !== undefined && obj.interface === EVENT_CARD_INTERFACE_NAME;
}
