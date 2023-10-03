import { OrderStatusTypesOptions } from './OrderStatusTypes.types';

export class OrderStatusTypes {
  public static labels: { [key: string]: string } = {
    completed: 'Finalizada',
    pending: 'Pendente',
    canceled: 'Cancelada',
  };
  public readonly value: OrderStatusTypesOptions;
  public static completed = new OrderStatusTypes('completed');
  public static pending = new OrderStatusTypes('pending');
  public static canceled = new OrderStatusTypes('canceled');

  protected constructor(value: OrderStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: OrderStatusTypesOptions) {
    return new OrderStatusTypes(value);
  }

  public label(): string {
    return OrderStatusTypes.labels[this.value];
  }

  public static getLabel(key: string): string | undefined {
    return OrderStatusTypes.labels[key];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(OrderStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(OrderStatusTypes.labels);
    const values = Object.values(OrderStatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
