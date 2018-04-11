import { CurriedFunction2 } from 'ramda';

import { UnionCheckType } from './type.interface';

export type BasicType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'any'
  | 'array'
  | 'tuple';

export type TEOther = '' | 'validator';
export type TEExist = 'exist' | TEOther;
export type TEType = 'type' | TEOther;
export type TEValidate = 'validate' | TEOther;
export type TECandidate = 'candidate' | TEOther;
export type TEMin = 'min' | TEOther;
export type TEMax = 'max' | TEOther;
export type TEPattern = 'pattern' | TEOther;
export type TEItem = 'item' | TEOther;
export type TEEmpty = 'empty' | TEOther;

export type ErrType =
  | TEExist
  | TEType
  | TEValidate
  | TECandidate
  | TEMin
  | TEMax
  | TEPattern
  | TEItem
  | TEEmpty;

export interface ErrChecker<Testee, R>
  extends CurriedFunction2<UnionCheckType, Testee, R> {}

export type ErrStatus = { type: UnionCheckType; testee: any; err: ErrType };

export interface HasErrBox
  extends CurriedFunction2<ErrChecker<any, ErrType>, ErrStatus, ErrStatus> {}
