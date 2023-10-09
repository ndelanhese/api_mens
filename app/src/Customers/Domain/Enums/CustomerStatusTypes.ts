import { CustomerStatusTypesOptions } from './CustomerStatusTypes.types';

export class CustomerStatusTypes {
  public static labels: { [key: string]: string } = {
    active: 'Ativo',
    inactive: 'Inativo',
  };
  public readonly value: CustomerStatusTypesOptions;
  public static active = new CustomerStatusTypes('active');
  public static inactive = new CustomerStatusTypes('inactive');

  protected constructor(value: CustomerStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: CustomerStatusTypesOptions) {
    return new CustomerStatusTypes(value);
  }

  public label(): string {
    return CustomerStatusTypes.labels[this.value];
  }

  public static getLabel(key: string): string | undefined {
    return CustomerStatusTypes.labels[key];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(CustomerStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(CustomerStatusTypes.labels);
    const values = Object.values(CustomerStatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
