import { curry, isNil } from 'ramda';

import { isMax, isMin, isPattern, isType } from '../checker';
import { IVtor } from '../interface';
import {
  ErrChecker,
  ErrType,
  HasErrBox,
  TECandidate,
  TEEmpty,
  TEExist,
  TEItem,
  TEMax,
  TEMin,
  TEPattern,
  TEType,
  TEValidate,
} from './err-checker.interface';

export const boolErrType = (errType: ErrType) =>
  errType === '' ? false : true;

export const hasErr: HasErrBox = curry((errChecker, { type, testee, err }) => ({
  type,
  testee,
  err: err !== '' ? err : errChecker(type, testee),
}));

export const hasExistErr: ErrChecker<any, TEExist> = curry(
  (type, testee) => (!isNil(testee) ? '' : type.optional ? '' : 'exist'),
);

export const hasTypeErr: ErrChecker<any, TEType> = curry(
  (type, testee) => (isType(type.type, testee) ? '' : 'type'),
);

export const hasValidateErr: ErrChecker<
  string | number | any[],
  TEValidate
> = curry((type, testee) => {
  if (
    type.type === 'string' ||
    type.type === 'number' ||
    type.type === 'array'
  ) {
    return isNil(type.validate) ? '' : type.validate(testee) ? '' : 'validate';
  } else {
    return 'validator';
  }
});

export const hasCandidateErr: ErrChecker<any, TECandidate> = curry(
  (type, testee) => {
    if (type.type === 'string' || type.type === 'number') {
      return isNil(type.candidates)
        ? ''
        : (type.candidates as any[]).includes(testee) ? '' : 'candidate';
    } else {
      return 'validator';
    }
  },
);

export const hasMinErr: ErrChecker<number, TEMin> = curry((type, testee) => {
  if (
    type.type === 'number' ||
    type.type === 'string' ||
    type.type === 'array'
  ) {
    return isNil(type.min) ? '' : isMin(type.min, testee) ? '' : 'min';
  } else {
    return 'validator';
  }
});

export const hasMaxErr: ErrChecker<number, TEMax> = curry((type, testee) => {
  if (
    type.type === 'number' ||
    type.type === 'string' ||
    type.type === 'array'
  ) {
    return isNil(type.max) ? '' : isMax(type.max, testee) ? '' : 'max';
  } else {
    return 'validator';
  }
});

export const hasPatternErr: ErrChecker<string, TEPattern> = curry(
  (type, testee) => {
    if (type.type === 'string') {
      return isNil(type.pattern)
        ? ''
        : isPattern(type.pattern, testee) ? '' : 'pattern';
    } else {
      return 'validator';
    }
  },
);

export const hasEmptyErr: ErrChecker<any[], TEEmpty> = curry((type, testee) => {
  if (type.type === 'array') {
    return isNil(type.isEmpty)
      ? ''
      : type.isEmpty && testee.length === 0 ? 'empty' : '';
  } else {
    return 'validator';
  }
});

// TODO: tuple and array hasErr
export const hasArrayItemErr: ErrChecker<any[], TEItem> = curry(
  (type, testee) => {
    if (type.type === 'array') {
      return testee.some(value => (type.schema as IVtor).hasErr(value))
        ? 'item'
        : '';
    } else {
      return 'validator';
    }
  },
);

export const hasTupleItemErr: ErrChecker<any[], TEItem> = curry(
  (type, testee) => {
    if (type.type === 'tuple') {
      return type.schema.some((vtor, index) =>
        (vtor as IVtor).hasErr(testee[index]),
      )
        ? 'item'
        : '';
    } else {
      return 'validator';
    }
  },
);
