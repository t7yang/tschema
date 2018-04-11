import { IVtor } from '../interface';

export type BasicType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'any'
  | 'array'
  | 'tuple';

export interface TypeCommon {
  type: BasicType;
  default?: any;
  optional?: boolean;
}

export interface TypeValidate {
  validate?: (testee: any) => boolean;
}

export interface TypeCandidate<T> {
  candidates?: T[];
}

export interface TypeRange {
  min?: number;
  max?: number;
}

export interface TypePattern {
  pattern?: RegExp;
}

export interface StringType
  extends TypeCommon,
    TypeValidate,
    TypeCandidate<string>,
    TypeRange,
    TypePattern {
  type: 'string';
}

export interface NumberType
  extends TypeCommon,
    TypeValidate,
    TypeCandidate<number>,
    TypeRange {
  type: 'number';
}

export interface BooleanType extends TypeCommon {
  type: 'boolean';
}

export interface AnyType extends TypeCommon {
  type: 'any';
}

export interface ArrayType extends TypeCommon, TypeValidate, TypeRange {
  type: 'array';
  schema: IVtor;
  isEmpty?: boolean;
}

export interface TupleType extends TypeCommon {
  type: 'tuple';
  schema: IVtor[];
}

export type UnionCheckType =
  | StringType
  | NumberType
  | BooleanType
  | AnyType
  | ArrayType
  | TupleType;
