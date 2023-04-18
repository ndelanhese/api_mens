import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    first_name: joi.string().min(3).required(),
    last_name: joi.string().min(3).required(),
    phone_number: joi.string().min(9).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    status: joi.string().valid('active', 'inactive').required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default createUserMiddleware;
