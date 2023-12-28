import { StatusTypesOptions } from './StatusTypes.types';

export class StatusTypes {
  public static labels = {
    active: 'Ativo',
    inactive: 'Inativo',
    pending: 'Pendente',
    suspended: 'Suspenso',
    blocked: 'Bloqueado',
  };
  public readonly value: StatusTypesOptions;
  public static active = new StatusTypes('active');
  public static inactive = new StatusTypes('inactive');
  public static pending = new StatusTypes('pending');
  public static suspended = new StatusTypes('suspended');
  public static blocked = new StatusTypes('blocked');

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
      value: key,
      label: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
