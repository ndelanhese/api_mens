import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const updateUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updateSchema = joi.object({
    first_name: joi.string().min(3),
    last_name: joi.string().min(3),
    phone_number: joi.string().min(9),
    email: joi.string().email(),
    password: joi.string().min(6),
    status: joi.string().valid('active', 'inactive'),
  });
  const updateIdSchema = joi.object({
    id: joi.number().required(),
  });
  const { error: errorBody } = updateSchema.validate(req.body, { messages });
  const { error: errorParams } = updateIdSchema.validate(req.params, {
    messages,
  });
  if (errorBody || errorParams) {
    const message =
      errorBody?.details[0].message || errorParams?.details[0].message;
    return res.status(400).send({ message });
  }
  next();
};
export default updateUserMiddleware;
