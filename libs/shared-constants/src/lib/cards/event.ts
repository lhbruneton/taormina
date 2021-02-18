import { createEventCard, EventCard } from '@taormina/shared-models';

export const eventCards = new Map<string, EventCard>([
  ['EVENT_0', createEventCard('EVENT_0', 'Festival', [])],
  ['EVENT_1', createEventCard('EVENT_1', 'Auspicious year', [])],
  ['EVENT_2', createEventCard('EVENT_2', 'Auspicious year', [])],
  ['EVENT_3', createEventCard('EVENT_3', 'Hawker', [])],
  ['EVENT_4', createEventCard('EVENT_4', 'Hawker', [])],
  ['EVENT_5', createEventCard('EVENT_5', 'Invention', [])],
  ['EVENT_6', createEventCard('EVENT_6', 'Merchant ship travel', [])],
  ['EVENT_7', createEventCard('EVENT_7', 'Quarrel', [])],
  ['EVENT_8', createEventCard('EVENT_8', 'Sibling rivalry', [])],
]);
