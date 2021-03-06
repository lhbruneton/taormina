import { HasId } from '../interfaces/entity';
import { HasName } from '../interfaces/name';
import { HasRules } from '../interfaces/rules';
import { EventName } from '../types/event';

export const EVENT_CARD_INTERFACE_NAME = 'DevelopmentCard';

/**
 * Interface for the Event Cards
 */
export interface EventCard extends HasId, HasName, HasRules {
  interface: typeof EVENT_CARD_INTERFACE_NAME;
  id: string;
  name: EventName;
  ruleIds: string[];
}

export const createEventCard = (
  id: string,
  name: EventName,
  ruleIds: string[]
): EventCard => ({ interface: EVENT_CARD_INTERFACE_NAME, id, name, ruleIds });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEventCard(obj: any): obj is EventCard {
  return obj !== undefined && obj.interface === EVENT_CARD_INTERFACE_NAME;
}
