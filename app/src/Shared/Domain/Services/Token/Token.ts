import jwt, { Algorithm, JwtPayload, Secret } from 'jsonwebtoken';
import HttpError from '@exceptions/HttpError';
import {
  IJwtConfig,
  IToken,
  IUserAdminDataToken,
  IUserMyMensDataToken,
} from './Token.types';

export default class Token {
  private secret: Secret;

  private algorithm: Algorithm;

  private expiresIn: string;

  constructor(algorithm: Algorithm = 'HS256', expiresIn = '24h') {
    this.expiresIn = expiresIn;
    this.algorithm = algorithm;
    this.secret = process.env.APP_KEY || '';
  }

  private jwtConfig(): IJwtConfig {
    return {
      algorithm: this.algorithm,
      expiresIn: this.expiresIn,
    };
  }

  public generateToken(payload: JwtPayload): IToken {
    const token = jwt.sign(payload, this.secret, this.jwtConfig());
    return { token };
  }

  public verifyToken(token: string): JwtPayload | string {
    try {
      const data = jwt.verify(token, this.secret);
      return data;
    } catch (error) {
      throw new HttpError(403, 'Não autorizado.');
    }
  }

  public static deserializeAdminToken(token: string): IUserAdminDataToken {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }

  public static deserializeMyMensToken(token: string): IUserMyMensDataToken {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  }
}
