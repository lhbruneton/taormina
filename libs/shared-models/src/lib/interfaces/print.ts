export interface CanPrint {
  print(): string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCanPrint(obj: any): obj is CanPrint {
  return typeof obj.print === 'function';
}
