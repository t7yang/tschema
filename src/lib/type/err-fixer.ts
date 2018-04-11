import { CurriedFunction2, curry } from 'ramda';

import { type } from './type';
import { UnionCheckType } from './type.interface';

export interface FixerBox
  extends CurriedFunction2<ErrFixer, FixerStatus, FixerStatus> {}

export const fixBy: FixerBox = curry((fixer, status) => {
  const { type, testee, fixed } = status;
  return {
    type,
    testee,
    fixed: fixed === undefined ? fixer(type, testee) : fixed,
  };
});

export interface FixerStatus {
  type: UnionCheckType;
  testee: any;
  fixed: any;
}

export interface ErrFixer {
  (type: UnionCheckType, testee: any): any;
}

export const fixByDefault: ErrFixer = type => type.default;

export const fixByCandidate: ErrFixer = type => {
  if (type.type === 'string' || type.type === 'number') {
    return (type.candidates || [])[0];
  } else {
    return undefined;
  }
};

// TODO: array and tuple should try to fixed rather than default.
export const fixArray: ErrFixer = (type, testee = []) => {
  if (type.type === 'array') {
    return testee.map((value: any) => type.schema.from(value));
  } else {
    return undefined;
  }
};

export const fixTuple: ErrFixer = (type, testee = []) => {
  if (type.type === 'tuple') {
    return type.schema.map((vtor, index) => vtor.from(testee[index]));
  } else {
    return undefined;
  }
};
