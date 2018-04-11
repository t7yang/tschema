export interface IValidator {
  test(value: any): boolean;
  create(value: any): any;
}

export interface IVtor extends IHasErr, IFrom {}

export interface IHasErr {
  hasErr(testee: any): boolean;
}

export interface IFrom {
  from(testee: any): any;
}
