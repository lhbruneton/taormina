import { DomainColor } from '@taormina/shared-models';
import {
  ID_DOMAIN_BLUE,
  ID_DOMAIN_RED,
  ID_HAND_BLUE,
  ID_HAND_RED,
} from '@taormina/shared-constants';

export function mapDomainColorToDomainId(domainColor: DomainColor): string {
  switch (domainColor) {
    case DomainColor.Red:
      return ID_DOMAIN_RED;
    case DomainColor.Blue:
      return ID_DOMAIN_BLUE;
    default:
      throw new Error(
        `Something went wrong, ${domainColor} should be one of ${ID_DOMAIN_RED} or ${ID_DOMAIN_BLUE}.`
      );
  }
}

export function mapDomainColorToHandId(domainColor: DomainColor): string {
  switch (domainColor) {
    case DomainColor.Red:
      return ID_HAND_RED;
    case DomainColor.Blue:
      return ID_HAND_BLUE;
    default:
      throw new Error(
        `Something went wrong, ${domainColor} should be one of ${ID_HAND_BLUE} or ${ID_HAND_BLUE}.`
      );
  }
}
