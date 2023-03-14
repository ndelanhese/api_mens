import { Algorithm } from 'jsonwebtoken';

export interface IJwtConfig {
  algorithm: Algorithm;
  expiresIn: string;
}

export interface IToken {
  token: string;
}

export interface ITokenReturn {
  token: string;
  userData: { id: number; name: string };
  expiresIn: Date;
}

export interface IUserAdminDataToken {
  name: string;
  email: string;
  id: number;
}

export interface IUserMyMensDataToken {
  userCode: string;
  resale: string;
  login: string;
  company: string;
  companyCode: string;
  cnpj: string;
  email: string;
  token: string;
  name: string;
}
