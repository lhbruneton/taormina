export interface HasName {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isHasName(obj: any): obj is HasName {
  return typeof obj.name === 'string';
}
