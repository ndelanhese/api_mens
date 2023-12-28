import { StatesOption } from './States.types';

export class States {
  public static labels = {
    AC: 'Acre',
    AL: 'Alagoas',
    AP: 'Amapá',
    AM: 'Amazonas',
    BA: 'Bahia',
    CE: 'Ceará',
    DF: 'Distrito Federal',
    ES: 'Espírito Santo',
    GO: 'Goiás',
    MA: 'Maranhão',
    MT: 'Mato Grosso',
    MS: 'Mato Grosso do Sul',
    MG: 'Minas Gerais',
    PA: 'Pará',
    PB: 'Paraíba',
    PR: 'Paraná',
    PE: 'Pernambuco',
    PI: 'Piauí',
    RJ: 'Rio de Janeiro',
    RN: 'Rio Grande do Norte',
    RS: 'Rio Grande do Sul',
    RO: 'Rondônia',
    RR: 'Roraima',
    SC: 'Santa Catarina',
    SP: 'São Paulo',
    SE: 'Sergipe',
    TO: 'Tocantins',
  };

  public readonly value: StatesOption;
  public static AL = new States('AL');
  public static AP = new States('AP');
  public static AM = new States('AM');
  public static BA = new States('BA');
  public static CE = new States('CE');
  public static DF = new States('DF');
  public static ES = new States('ES');
  public static GO = new States('GO');
  public static MA = new States('MA');
  public static MT = new States('MT');
  public static MS = new States('MS');
  public static MG = new States('MG');
  public static PA = new States('PA');
  public static PB = new States('PB');
  public static PR = new States('PR');
  public static PE = new States('PE');
  public static PI = new States('PI');
  public static RJ = new States('RJ');
  public static RN = new States('RN');
  public static RS = new States('RS');
  public static RO = new States('RO');
  public static RR = new States('RR');
  public static SC = new States('SC');
  public static SP = new States('SP');
  public static SE = new States('SE');
  public static TO = new States('TO');

  protected constructor(value: StatesOption) {
    this.value = value;
  }

  public static from(value: StatesOption) {
    return new States(value);
  }

  public label(): string {
    return States.labels[this.value];
  }

  public static isValid(value: string): boolean {
    const keys = Object.keys(States.labels);
    return keys.includes(value);
  }

  public static labelsToKeyValue(): Array<Object> {
    const keys = Object.keys(States.labels);
    const values = Object.values(States.labels);
    return keys.map((key, index) => ({
      value: key,
      label: values[index],
    }));
  }

  public toString(): string {
    return this.value;
  }
}
