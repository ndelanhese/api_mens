import { StatusTypesOptions } from './StatusTypes.types';

export class StatusTypes {
  public static labels = {
    completed: 'Finalizada',
    refunded: 'Estornada',
    pending: 'Pendente',
    canceled: 'Cancelada',
  };
  public readonly value: StatusTypesOptions;
  public static completed = new StatusTypes('completed');
  public static refunded = new StatusTypes('refunded');
  public static pending = new StatusTypes('pending');
  public static canceled = new StatusTypes('canceled');

  protected constructor(value: StatusTypesOptions) {
    this.value = value;
  }

  public static from(value: StatusTypesOptions) {
    return new StatusTypes(value);
  }

  public label(): string {
    return StatusTypes.labels[this.value];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(StatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(StatusTypes.labels);
    const values = Object.values(StatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
