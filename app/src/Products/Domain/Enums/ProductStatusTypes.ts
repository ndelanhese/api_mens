import { ProductStatusTypesOptions } from './ProductStatusTypes.types';

export class ProductStatusTypes {
  public static labels: { [key: string]: string } = {
    active: 'Ativo',
    inactive: 'Inativo',
  };
  public readonly value: ProductStatusTypesOptions;
  public static active = new ProductStatusTypes('active');
  public static inactive = new ProductStatusTypes('inactive');

  protected constructor(value: ProductStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: ProductStatusTypesOptions) {
    return new ProductStatusTypes(value);
  }

  public label(): string {
    return ProductStatusTypes.labels[this.value];
  }

  public static getLabel(key: string): string | undefined {
    return ProductStatusTypes.labels[key];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(ProductStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(ProductStatusTypes.labels);
    const values = Object.values(ProductStatusTypes.labels);
    return keys.map((key, index) => ({
      value: key,
      label: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
