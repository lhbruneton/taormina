export interface CanPrint {
  print(): string;
}

export function isCanPrint(obj: any): obj is CanPrint {
  return typeof obj.print === 'function';
}
