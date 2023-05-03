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
