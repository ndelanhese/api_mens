import { SaleStatusTypesOptions } from './SaleStatusTypes.types';

export class SaleStatusTypes {
  public static labels = {
    completed: 'Finalizada',
    refunded: 'Estornada',
    pending: 'Pendente',
    canceled: 'Cancelada',
  };
  public readonly value: SaleStatusTypesOptions;
  public static completed = new SaleStatusTypes('completed');
  public static refunded = new SaleStatusTypes('refunded');
  public static pending = new SaleStatusTypes('pending');
  public static canceled = new SaleStatusTypes('canceled');

  protected constructor(value: SaleStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: SaleStatusTypesOptions) {
    return new SaleStatusTypes(value);
  }

  public label(): string {
    return SaleStatusTypes.labels[this.value];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(SaleStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(SaleStatusTypes.labels);
    const values = Object.values(SaleStatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
