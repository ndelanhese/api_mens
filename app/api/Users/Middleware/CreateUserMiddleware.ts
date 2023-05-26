import { StatusTypes } from '@app/src/Shared/Domain/Enums/StatusTypes';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    user: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    status: joi.string().required(),
    employee_id: joi.number().required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  const status = req.body.status;
  if (status && !StatusTypes.isValid(status)) {
    return res.status(400).send({ message: 'Status inválido.' });
  }
  next();
};
export default createUserMiddleware;
