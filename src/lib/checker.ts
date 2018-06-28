import { isNil } from 'ramda';
import { BasicType } from './type/type.interface';

export function isArray(value: any): boolean {
  return Array.isArray(value);
}

export function isEmptyObject(value: any) {
  return !isNil(value) ? Object.keys(value).length === 0 : false;
}

export function isType(type: BasicType, value: any): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'boolean':
      return typeof value === 'boolean';
    case 'any':
      return true;
    case 'array':
      return isArray(value);
    case 'tuple':
      return isArray(value);
    default:
      return false;
  }
}

export function isMin(min: number, value: number | string | any[]): boolean {
  return isType('number', value)
    ? (value as number) >= min
    : (value as string | any[]).length >= min;
}

export function isMax(max: number, value: number | string | any[]): boolean {
  return isType('number', value)
    ? (value as number) <= max
    : (value as string | any[]).length <= max;
}

export function isPattern(regexp: RegExp, value: string) {
  return regexp.test(value);
}
