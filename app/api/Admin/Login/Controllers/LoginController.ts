import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import HttpError from '@exceptions/HttpError';
import Token from '@app/src/Shared/Domain/Services/Token/Token';
import { getNextDay } from '@shared/Date';
import LoginModel from '../Models/LoginModel';

export default class LoginController {
  private loginModel: LoginModel;

  private jwt: Token;

  constructor() {
    this.loginModel = new LoginModel();
    this.jwt = new Token();
  }

  public async login(
    req: Request,
    res: Response,
  ): Promise<Response<string> | undefined> {
    try {
      const { email, password } = req.body;
      const user = await this.loginModel.getUserByEmail(email);
      if (user) {
        const isPwdValid = await bcrypt.compare(
          password,
          <string>user.password,
        );
        if (isPwdValid) {
          const userData = {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email,
          };
          const { token } = this.jwt.generateToken(userData);
          const expiresIn = getNextDay();
          return res.status(200).json({
            token,
            userData: {
              name: userData.name,
              email,
            },
            expiresIn,
          });
        }
      }
      throw new HttpError(403, 'Usuário ou senha inválidos.');
    } catch (error) {
      if (error instanceof HttpError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
    }
  }
}
