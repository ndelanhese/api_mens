import { SupplierStatusTypesOptions } from './SupplierStatusTypes.types';

export class SupplierStatusTypes {
  public static labels = {
    active: 'Ativo',
    inactive: 'Inativo',
  };
  public readonly value: SupplierStatusTypesOptions;
  public static active = new SupplierStatusTypes('active');
  public static inactive = new SupplierStatusTypes('inactive');

  protected constructor(value: SupplierStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: SupplierStatusTypesOptions) {
    return new SupplierStatusTypes(value);
  }

  public label(): string {
    return SupplierStatusTypes.labels[this.value];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(SupplierStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(SupplierStatusTypes.labels);
    const values = Object.values(SupplierStatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
