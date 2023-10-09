import { EmployeeStatusTypesOptions } from './EmployeeStatusTypes.types';

export class EmployeeStatusTypes {
  public static labels: { [key: string]: string } = {
    active: 'Ativo',
    inactive: 'Inativo',
  };
  public readonly value: EmployeeStatusTypesOptions;
  public static active = new EmployeeStatusTypes('active');
  public static inactive = new EmployeeStatusTypes('inactive');

  protected constructor(value: EmployeeStatusTypesOptions) {
    this.value = value;
  }

  public static from(value: EmployeeStatusTypesOptions) {
    return new EmployeeStatusTypes(value);
  }

  public label(): string {
    return EmployeeStatusTypes.labels[this.value];
  }

  public static getLabel(key: string): string | undefined {
    return EmployeeStatusTypes.labels[key];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(EmployeeStatusTypes.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(EmployeeStatusTypes.labels);
    const values = Object.values(EmployeeStatusTypes.labels);
    return keys.map((key, index) => ({
      key,
      value: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
