import { Response, Request, NextFunction } from 'express';
import HttpError from '@exceptions/HttpError';
import Jwt from '@app/src/Shared/Domain/Services/Token/Token';

const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = new Jwt();
    const token = req.headers.authorization;
    if (!token) res.status(401).json({ message: 'Não autorizado.' });
    const data = jwt.verifyToken(<string>token?.replace('Bearer ', ''));
    res.locals.user = data;
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.statusCode).send({ message: error.message });
    }
  }
};

export default authToken;
