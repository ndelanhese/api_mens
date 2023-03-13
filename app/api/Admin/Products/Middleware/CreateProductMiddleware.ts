import { messages } from 'joi-translation-pt-br';
import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const createProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const createSchema = joi.object({
    type: joi.string().required(),
    part_number: joi.string().required(),
    description: joi.string().required(),
    currency: joi.string().allow(''),
    contributor_price: joi.number().required(),
    exempt_price: joi.number().allow(''),
    note: joi.string().allow(''),
    outlet: joi.boolean().required(),
  });
  const { error } = createSchema.validate(req.body, { messages });
  if (error) {
    const { message } = error.details[0];
    return res.status(400).send({ message });
  }
  next();
};

export default createProductMiddleware;
