import { difference, isNil } from 'ramda';

import { IFrom, IHasErr } from '../interface';
import { Schema } from './schema.interface';

export const $$KEY$$ = Symbol('$$KEY$$');

export function schema(schema: Schema) {
  return new SchemaVtor(schema);
}

export class SchemaVtor implements IHasErr, IFrom {
  private unnamedKeys(testee: any) {
    return difference(Object.keys(testee), Object.keys(this.schema));
  }

  private hasNamedKeyErr(testee: any) {
    return Object.entries(this.schema).some(([key, vtor]) => {
      return vtor.hasErr(testee[key]);
    });
  }

  private hasUnnamedKeyErr(testee: any) {
    const vtor = this.schema[$$KEY$$];
    if (isNil(vtor)) {
      return false;
    } else {
      return this.unnamedKeys(testee)
        .map(key => testee[key])
        .some(value => this.schema[$$KEY$$].hasErr(value));
    }
  }

  private fixedNamedKey(testee: any = {}) {
    return Object.entries(this.schema).map(([key, vtor]) => [
      key,
      vtor.from(testee[key]),
    ]);
  }

  private fixedUnnamedKey(testee: any = {}) {
    const vtor = this.schema[$$KEY$$];
    if (isNil(vtor)) {
      return [];
    } else {
      return this.unnamedKeys(testee).map(key => [key, vtor.from(testee[key])]);
    }
  }

  hasErr(testee: any = {}) {
    return this.hasNamedKeyErr(testee) || this.hasUnnamedKeyErr(testee);
  }

  from(testee: any) {
    const all = [
      ...this.fixedNamedKey(testee),
      ...this.fixedUnnamedKey(testee),
    ];

    return all.reduce((sum: any, [key, value]) => {
      sum[key] = value;
      return sum;
    }, {});
  }

  constructor(private schema: Schema) {}
}
