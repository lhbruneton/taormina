import { ResourceType } from '../types/resources';

export interface HasCost {
  cost: Map<ResourceType, number>;
}
