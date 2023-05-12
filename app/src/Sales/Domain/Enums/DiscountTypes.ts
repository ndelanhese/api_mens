import { DiscountTypesOption } from './DiscountTypes.types';

export class DiscountTypes {
  public static labels = {
    percentage: 'Porcentagem',
    fixed: 'Fixo',
  };
  public readonly value: DiscountTypesOption;
  public static percentage = new DiscountTypes('percentage');
  public static fixed = new DiscountTypes('fixed');

  protected constructor(value: DiscountTypesOption) {
    this.value = value;
  }

  public static from(value: DiscountTypesOption) {
    return new DiscountTypes(value);
  }

  public label(): string {
    return DiscountTypes.labels[this.value];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(DiscountTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(DiscountTypes.labels);
    const values = Object.values(DiscountTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
