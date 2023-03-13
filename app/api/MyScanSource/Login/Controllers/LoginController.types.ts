export interface ICreateSessionNbc {
  login: string;
  password: string;
  resale: string;
  token: string;
}

export interface ISessionNbc {
  CODUSER: string;
  EMPRESA: string;
  CODEMPR: string;
  CNPJ: string;
  EMAIL: string;
  _token: string;
}

export interface ISessionNbcName {
  Nome: string;
}