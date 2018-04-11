import { pipe } from 'ramda';

import { IFrom, IHasErr } from '../interface';
import {
  boolErrType,
  hasArrayItemErr,
  hasCandidateErr,
  hasErr,
  hasExistErr,
  hasMaxErr,
  hasMinErr,
  hasPatternErr,
  hasTupleItemErr,
  hasTypeErr,
  hasValidateErr,
} from './err-checker';
import { arrayFixer, booleanFixer, numberFixer, stringFixer, tupleFixer } from './type-fixer';
import { UnionCheckType } from './type.interface';

export function type(type: UnionCheckType) {
  return new TypeVtor(type);
}

export class TypeVtor implements IHasErr, IFrom {
  hasErr(testee: any) {
    const { type } = this;

    switch (this.type.type) {
      case 'string':
        return boolErrType(hasStringErr({ type, testee, err: '' }).err);
      case 'number':
        return boolErrType(hasNumberErr({ type, testee, err: '' }).err);
      case 'boolean':
        return boolErrType(hasBooleanErr({ type, testee, err: '' }).err);
      case 'any':
        return false;
      case 'array':
        return boolErrType(hasArrayErr({ type, testee, err: '' }).err);
      case 'tuple':
        return boolErrType(hasTupleErr({ type, testee, err: '' }).err);
      default:
        return false;
    }
  }

  from(testee: any) {
    const { type } = this;

    switch (type.type) {
      case 'string':
        return this.hasErr(testee)
          ? stringFixer({ type, testee, fixed: undefined }).fixed
          : testee;
      case 'number':
        return this.hasErr(testee)
          ? numberFixer({ type, testee, fixed: undefined }).fixed
          : testee;
      case 'boolean':
        return this.hasErr(testee)
          ? booleanFixer({ type, testee, fixed: undefined }).fixed
          : testee;
      case 'any':
        return testee;
      case 'array':
        return this.hasErr(testee)
          ? arrayFixer({ type, testee, fixed: undefined }).fixed
          : testee;
      case 'tuple':
        return this.hasErr(testee)
          ? tupleFixer({ type, testee, fixed: undefined }).fixed
          : testee;
      default:
        return testee;
    }
  }

  constructor(private type: UnionCheckType) {}
}

const hasStringErr = pipe(
  hasErr(hasExistErr),
  hasErr(hasTypeErr),
  hasErr(hasValidateErr),
  hasErr(hasCandidateErr),
  hasErr(hasMinErr),
  hasErr(hasMaxErr),
  hasErr(hasPatternErr),
);

const hasNumberErr = pipe(
  hasErr(hasExistErr),
  hasErr(hasTypeErr),
  hasErr(hasValidateErr),
  hasErr(hasCandidateErr),
  hasErr(hasMinErr),
  hasErr(hasMaxErr),
);

const hasBooleanErr = pipe(hasErr(hasExistErr), hasErr(hasTypeErr));

const hasArrayErr = pipe(
  hasErr(hasExistErr),
  hasErr(hasTypeErr),
  hasErr(hasValidateErr),
  hasErr(hasMinErr),
  hasErr(hasMaxErr),
  hasErr(hasArrayItemErr),
);

const hasTupleErr = pipe(
  hasErr(hasExistErr),
  hasErr(hasTypeErr),
  hasErr(hasTupleItemErr),
);
