import { PromotionStatusTypesOptions } from './PromotionStatusTypes.types';

export class PromotionStatusTypes {
  public static labels: { [key: string]: string } = {
    completed: 'Finalizada',
    pending: 'Pendente',
    canceled: 'Cancelada',
    started: 'Iniciada',
  };
  public readonly value: PromotionStatusTypesOptions;
  public static completed = new PromotionStatusTypes('completed');
  public static pending = new PromotionStatusTypes('pending');
  public static canceled = new PromotionStatusTypes('canceled');
  public static started = new PromotionStatusTypes('started');

  protected constructor(value: PromotionStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: PromotionStatusTypesOptions) {
    return new PromotionStatusTypes(value);
  }

  public label(): string {
    return PromotionStatusTypes.labels[this.value];
  }

  public static getLabel(key: string): string | undefined {
    return PromotionStatusTypes.labels[key];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(PromotionStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(PromotionStatusTypes.labels);
    const values = Object.values(PromotionStatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
