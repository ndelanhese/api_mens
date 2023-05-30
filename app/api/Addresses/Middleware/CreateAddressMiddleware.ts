import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import { messages } from 'joi-translation-pt-br';

const createAddressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    address: joi.string().required(),
    number: joi.string().required(),
    district: joi.string().required(),
    postal_code: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};
export default createAddressMiddleware;
