import Token from '@app/src/Shared/Domain/Services/Token/Token';
import { Response, Request } from 'express';
import HttpError from '@exceptions/HttpError';
import { getNextDay } from '@shared/Date';
import {
  ICreateSessionNbc,
  ISessionNbc,
  ISessionNbcName,
} from './LoginController.types';
import axios from 'axios';
import { cnpjMask } from '@shared/Formatter';

export default class LoginController {
  public async login(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { login, password, resale } = req.body;
      const randomToken = `${Math.random()
        .toString(36)
        .substring(7)}${Math.random().toString(36).substring(7)}`;

      const sessionData = await this.createNbcSession({
        login,
        password,
        resale,
        token: randomToken,
      });
      if (!sessionData) {
        throw new HttpError(403, 'Usuário ou senha inválidos.');
      }
      const jwt = new Token();
      const userNbcData = await this.getNbcNameBySession(sessionData._token);
      const userData = {
        userCode: sessionData.CODUSER,
        resale,
        login,
        company: sessionData.EMPRESA,
        companyCode: sessionData.CODEMPR,
        cnpj: cnpjMask(sessionData.CNPJ),
        email: sessionData.EMAIL.toLocaleLowerCase(),
        name: userNbcData.Nome,
        token: sessionData._token,
      };
      const { token } = jwt.generateToken(userData);
      return res.status(200).json({ token, userData, expiresIn: getNextDay() });
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }

  private async createNbcSession({
    login,
    password,
    resale,
    token,
  }: ICreateSessionNbc) {
    try {
      const data: ISessionNbc = await axios
        .post(
          'https://nbc.intersmartweb.com.br/RserverB2B/api/SignIn',
          {
            login,
            password,
            revenda: resale,
            token,
          },
          { timeout: 5000 },
        )
        .then((response) => response.data);
      return data;
    } catch (error) {
      throw new HttpError(500, 'Erro ao criar sessão.', error);
    }
  }

  private async getNbcNameBySession(sessionToken: string) {
    try {
      const data: ISessionNbcName = await axios
        .get(
          `https://nbc.intersmartweb.com.br/rServerB2B/api/User?id=${sessionToken}`,
          { timeout: 5000 },
        )
        .then((response) => response.data);
      return data;
    } catch {
      throw new HttpError(500, 'Erro ao pegar dados do usuário.');
    }
  }
}
