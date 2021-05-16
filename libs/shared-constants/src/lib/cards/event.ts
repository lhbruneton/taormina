import { createEventCard, EventCard, EventName } from '@taormina/shared-models';

export const eventCards = new Map<string, EventCard>([
  ['EVENT_0', createEventCard('EVENT_0', EventName.Festival, [])],
  ['EVENT_1', createEventCard('EVENT_1', EventName.AuspiciousYear, [])],
  ['EVENT_2', createEventCard('EVENT_2', EventName.AuspiciousYear, [])],
  ['EVENT_3', createEventCard('EVENT_3', EventName.Hawker, [])],
  ['EVENT_4', createEventCard('EVENT_4', EventName.Hawker, [])],
  ['EVENT_5', createEventCard('EVENT_5', EventName.Invention, [])],
  ['EVENT_6', createEventCard('EVENT_6', EventName.MerchantShipTravel, [])],
  ['EVENT_7', createEventCard('EVENT_7', EventName.Quarrel, [])],
  ['EVENT_8', createEventCard('EVENT_8', EventName.SiblingRivalry, [])],
]);
